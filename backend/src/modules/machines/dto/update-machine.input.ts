import { CreateMachineInput } from "./create-machine.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateMachineInput extends PartialType(CreateMachineInput) {
	@Field(() => Int, { nullable: false })
	id!: number;

	@Field(() => Boolean, { nullable: false })
	active!: boolean;

	@Field(() => Boolean, { nullable: false })
	available!: boolean;

	@Field(() => Boolean, { nullable: false })
	hasLaundry!: boolean;

	@Field(() => Date, { nullable: true })
	startTime?: Date;

	@Field(() => Date, { nullable: true })
	endTime?: Date;

	@Field(() => Int, { nullable: false })
	avgDuration!: number;

	@Field(() => Int, { nullable: false })
	usageCount!: number;

	@Field(() => Date, { nullable: true })
	esimatedEndTime?: Date;
}
