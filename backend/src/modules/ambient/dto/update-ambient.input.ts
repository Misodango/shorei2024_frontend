import { CreateAmbientInput } from './create-ambient.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAmbientInput extends PartialType(CreateAmbientInput) {
  @Field(() => Int)
  id: number;
}
