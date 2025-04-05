import { Test, TestingModule } from '@nestjs/testing';
import { FaturasController } from './faturas.controller';
import { FaturasService } from './faturas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Fatura } from './entities/fatura.entity';

const mockFaturaRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  merge: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('FaturasController', () => {
  let controller: FaturasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FaturasController],
      providers: [
        FaturasService,
        {
          provide: getRepositoryToken(Fatura),
          useFactory: mockFaturaRepository,
        },
      ],
    }).compile();

    controller = module.get<FaturasController>(FaturasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
