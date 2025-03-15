import { Module } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { MachinesResolver } from './machines.resolver';

@Module({
  providers: [MachinesResolver, MachinesService],
})
export class MachinesModule {}
