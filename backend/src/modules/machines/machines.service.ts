import { Injectable } from "@nestjs/common";
import { CreateMachineInput } from "./dto/create-machine.input";
import { UpdateMachineInput } from "./dto/update-machine.input";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class MachinesService {
	constructor(private readonly prisma: PrismaService) {}

	create(createMachineInput: CreateMachineInput) {
		// return "This action adds a new machine";
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

	update(id: number, updateMachineInput: UpdateMachineInput) {
		return this.prisma.machine.update({
			where: { id: id },
			data: {
				active: updateMachineInput.active,
				hasLaundry: updateMachineInput.hasLaundry,
				available: updateMachineInput.available,
			},
		});
	}

	remove(id: number) {
		return this.prisma.machine.delete({
			where: { id: id },
		});
	}
}
