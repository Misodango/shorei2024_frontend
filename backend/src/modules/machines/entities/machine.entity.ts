import { Field } from "@nestjs/graphql";
import { ObjectType } from "@nestjs/graphql";
import { ID } from "@nestjs/graphql";
import { Int } from "@nestjs/graphql";

@ObjectType()
export class Machine {
	@Field(() => ID, { nullable: false })
	id!: number;

	@Field(() => Int, { nullable: false })
	floor!: number;

	@Field(() => Boolean, { nullable: false })
	active!: boolean;

	@Field(() => Boolean, { nullable: false })
	available!: boolean;

	@Field(() => Boolean, { nullable: false })
	hasLaundry!: boolean;

	@Field(() => Date, { nullable: false })
	startTime!: Date;

	@Field(() => Date, { nullable: true })
	endTime?: Date;

	@Field(() => Int, { nullable: false })
	avgDuration!: number;

	@Field(() => Int, { nullable: false })
	usageCount!: number;

	@Field(() => Date, { nullable: true })
	esimatedEndTime?: Date;

	@Field(() => Int, { nullable: true })
	get timeRemaining(): number | null {
		if (!this.available && this.esimatedEndTime) {
			const now = new Date();
			const endTime = new Date(this.esimatedEndTime);
			const remainingMs = endTime.getTime() - now.getTime();

			return remainingMs > 0 ? Math.round(remainingMs / 1000) : 0;
		}
		return 40;
	}
}
