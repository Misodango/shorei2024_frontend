import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateMachineInput {
	@Field(() => Int, { nullable: false })
	floor!: number;

	@Field(() => Boolean, { nullable: true })
	active!: boolean | false;

	@Field(() => Boolean, { nullable: true })
	available!: boolean | false;

	@Field(() => Boolean, { nullable: true })
	hasLaundry!: boolean | false;
}
