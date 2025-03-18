import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MachinesService } from './machines.service';
import { Machine } from './entities/machine.entity';
import { CreateMachineInput } from './dto/create-machine.input';
import { UpdateMachineInput } from './dto/update-machine.input';

@Resolver(() => Machine)
export class MachinesResolver {
  constructor(private readonly machinesService: MachinesService) {}

  @Mutation(() => Machine)
  createMachine(@Args('createMachineInput') createMachineInput: CreateMachineInput) {
    return this.machinesService.create(createMachineInput);
  }

  @Query(() => [Machine], { name: 'machines' })
  findAll() {
    return this.machinesService.findAll();
  }

  @Query(() => Machine, { name: 'machine', nullable:true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.machinesService.findOne(id);
  }

  @Query(() => [Machine], {name :'getMachines', nullable:true})
  findBySpecificFloor(@Args('floor', {type:() => Int}) floor:number){
    return this.machinesService.findBySpecificFloor(floor);
  }

  @Mutation(() => Machine)
  async updateMachine(@Args('updateMachineInput') updateMachineInput: UpdateMachineInput) {
    return this.machinesService.update(updateMachineInput.id, updateMachineInput);
  }

  @Mutation(() => Machine)
  removeMachine(@Args('id', { type: () => Int }) id: number) {
    return this.machinesService.remove(id);
  }
}
