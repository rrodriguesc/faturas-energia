import { Test, TestingModule } from '@nestjs/testing';
import { FaturasService } from './faturas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Fatura } from './entities/fatura.entity';
import { ObjectLiteral, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateFaturaDto } from './dto/create-fatura.dto';

const mockFaturaRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  merge: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

type MockRepository<T extends ObjectLiteral = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

describe('FaturasService', () => {
  let service: FaturasService;
  let faturaRepository: MockRepository<Fatura>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FaturasService,
        {
          provide: getRepositoryToken(Fatura),
          useFactory: mockFaturaRepository,
        },
      ],
    }).compile();

    service = module.get<FaturasService>(FaturasService);
    faturaRepository = module.get<MockRepository<Fatura>>(
      getRepositoryToken(Fatura),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should save a new fatura', async () => {
      const dto = {
        url: 'http://example.com',
        nCliente: '123',
        mesReferencia: new Date(),
        qtdEnergiaEletrica: 10,
        valorEnergiaEletrica: 20,
        qtdEnergiaSCEEE: 5,
        valorEnergiaSCEEE: 10,
        qtdEnergiaCompensada: 3,
        valorEnergiaCompensada: 5,
        contribuicaoMunicipal: 2,
      } as CreateFaturaDto;

      faturaRepository.save?.mockResolvedValue(dto);

      const result = await service.create(dto);
      expect(faturaRepository.save).toHaveBeenCalled();
      expect(result).toEqual(dto);
    });
  });

  describe('findAll', () => {
    it('should return all faturas', async () => {
      const faturas = [{ id: 1 }, { id: 2 }];
      faturaRepository.find?.mockResolvedValue(faturas);

      const result = await service.findAll();
      expect(result).toEqual(faturas);
    });
  });

  describe('findOne', () => {
    it('should return a fatura', async () => {
      const fatura = { id: 1 };
      faturaRepository.findOneBy?.mockResolvedValue(fatura);

      const result = await service.findOne(1);
      expect(result).toEqual(fatura);
    });

    it('should throw NotFoundException if not found', async () => {
      faturaRepository.findOneBy?.mockResolvedValue(undefined);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should call delete', async () => {
      faturaRepository.delete?.mockResolvedValue({});

      await service.remove(1);
      expect(faturaRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
