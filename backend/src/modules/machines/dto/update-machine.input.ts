import { CreateMachineInput } from "./create-machine.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateMachineInput extends PartialType(CreateMachineInput) {
	@Field(() => Int, { nullable: false })
	id!: number;

	@Field(() => Boolean, { nullable: false })
	active!: boolean | false;

	@Field(() => Boolean, { nullable: false })
	available!: boolean | false;

	@Field(() => Boolean, { nullable: false })
	hasLaundry!: boolean | false;
}
