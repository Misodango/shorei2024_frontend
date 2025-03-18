import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAmbientInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
