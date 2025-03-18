import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AmbientService } from './ambient.service';
import { Ambient } from './entities/ambient.entity';
import { CreateAmbientInput } from './dto/create-ambient.input';
import { UpdateAmbientInput } from './dto/update-ambient.input';

@Resolver(() => Ambient)
export class AmbientResolver {
  constructor(private readonly ambientService: AmbientService) {}

  @Mutation(() => Ambient)
  createAmbient(@Args('createAmbientInput') createAmbientInput: CreateAmbientInput) {
    return this.ambientService.create(createAmbientInput);
  }

  @Query(() => [Ambient], { name: 'ambient' })
  findAll() {
    return this.ambientService.findAll();
  }

  @Query(() => Ambient, { name: 'ambient' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ambientService.findOne(id);
  }

  @Mutation(() => Ambient)
  updateAmbient(@Args('updateAmbientInput') updateAmbientInput: UpdateAmbientInput) {
    return this.ambientService.update(updateAmbientInput.id, updateAmbientInput);
  }

  @Mutation(() => Ambient)
  removeAmbient(@Args('id', { type: () => Int }) id: number) {
    return this.ambientService.remove(id);
  }
}
