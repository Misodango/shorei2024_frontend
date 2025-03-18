import { Module } from '@nestjs/common';
import { AmbientService } from './ambient.service';
import { AmbientResolver } from './ambient.resolver';

@Module({
  providers: [AmbientResolver, AmbientService],
})
export class AmbientModule {}
