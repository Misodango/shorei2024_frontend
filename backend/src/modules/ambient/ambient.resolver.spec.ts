import { Test, TestingModule } from '@nestjs/testing';
import { AmbientResolver } from './ambient.resolver';
import { AmbientService } from './ambient.service';

describe('AmbientResolver', () => {
  let resolver: AmbientResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmbientResolver, AmbientService],
    }).compile();

    resolver = module.get<AmbientResolver>(AmbientResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
