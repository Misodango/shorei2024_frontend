import { Injectable } from "@nestjs/common";
import { CreateAmbientInput } from "./dto/create-ambient.input";
import { UpdateAmbientInput } from "./dto/update-ambient.input";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class AmbientService {
	private API_URL = "https://ambidata.io/api/v2/channels";
	private CHANNEL_ID = process.env.AMBIENT_CHANNEL_ID;
	private READ_KEY = process.env.AMBIENT_READ_KEY;

	constructor(private prisma: PrismaService) {}

	async getAmbientData() {
		const response = await fetch(
			`${this.API_URL}/${this.CHANNEL_ID}/data?readKey=${this.READ_KEY}&n=10`,
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch data: ${response.statusText}`);
		}

		return response.json(); // JSONデータをそのまま返す
	}

	create(createAmbientInput: CreateAmbientInput) {
		return "This action adds a new ambient";
	}

	findAll() {
		return `This action returns all ambient`;
	}

	findOne(id: number) {
		return `This action returns a #${id} ambient`;
	}

	update(id: number, updateAmbientInput: UpdateAmbientInput) {
		return `This action updates a #${id} ambient`;
	}

	remove(id: number) {
		return `This action removes a #${id} ambient`;
	}
}
