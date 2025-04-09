import { Injectable } from "@nestjs/common";
import { CreateMachineInput } from "./dto/create-machine.input";
import { UpdateMachineInput } from "./dto/update-machine.input";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class MachinesService {
	constructor(private readonly prisma: PrismaService) {}

	create(createMachineInput: CreateMachineInput) {
		return this.prisma.machine.create({
			data: {
				floor: createMachineInput.floor,
				active: createMachineInput.active || false,
				available: createMachineInput.available || true,
				hasLaundry: createMachineInput.hasLaundry || false,
			},
		});
	}

	async findAll() {
		return this.prisma.machine.findMany();
	}

	async findOne(id: number) {
		return this.prisma.machine.findUnique({
			where: {
				id: id,
			},
		});
	}

	async findBySpecificFloor(floor: number) {
		if (floor < 0) {
			return this.findAll();
		}
		return this.prisma.machine.findMany({
			where: {
				floor: floor,
			},
		});
	}

	async update(id: number, updateMachineInput: UpdateMachineInput) {
		const machine = await this.findOne(id);
		if (!machine) {
			throw new Error(`Machine with id ${id} not found`);
		}

		const availableChanged = machine.available !== updateMachineInput.available;
		let updateData: any = {
			active: updateMachineInput.active,
			hasLaundry: updateMachineInput.hasLaundry,
			available: updateMachineInput.available,
		};

		if (availableChanged) {
			// Machine becoming available (usage ending)
			if (!machine.available && updateMachineInput.available) {
				const endTime = new Date();
				// Only calculate duration if we have a valid startTime
				if (machine.startTime) {
					const duration =
						(endTime.getTime() - machine.startTime.getTime()) / 3600;
					const newAvgDuration =
						(machine.avgDuration * machine.usageCount + duration) /
						(machine.usageCount + 1);
					updateData = {
						...updateData,
						avgDuration: Math.round(newAvgDuration),
						usageCount: machine.usageCount + 1,
						endTime: endTime,
						estimatedEndTime: null, // Clear the estimated end time
					};
				}
			}
			// Machine becoming unavailable (usage starting)
			else if (machine.available && !updateMachineInput.available) {
				const startTime = new Date();
				const esimatedEndTime = new Date(
					startTime.getTime() + machine.avgDuration,
				);
				console.log(machine.avgDuration / 3600);
				console.log(esimatedEndTime);
				updateData = {
					...updateData,
					startTime: startTime,
					estimatedEndTime: esimatedEndTime,
					endTime: null, // Clear the previous end time
				};
			}
		}

		// Single database update with all changes
		return this.prisma.machine.update({
			where: { id: id },
			data: updateData,
		});
	}

	remove(id: number) {
		return this.prisma.machine.delete({
			where: { id: id },
		});
	}
}
