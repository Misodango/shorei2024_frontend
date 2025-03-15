import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class Machine {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    floor!: number;

    @Field(() => Boolean, {nullable:false})
    active!: boolean;

    @Field(() => Boolean, {nullable:false})
    available!: boolean;

    @Field(() => Boolean, {nullable:false})
    hasLaundry!: boolean;
}
