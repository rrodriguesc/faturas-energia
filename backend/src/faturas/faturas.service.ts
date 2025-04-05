import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual, Between } from 'typeorm';
import { CreateFaturaDto } from './dto/create-fatura.dto';
import { UpdateFaturaDto } from './dto/update-fatura.dto';
import { Fatura } from './entities/fatura.entity';
import { buildFatura } from '../utils/build-fatura';

const parseDate = (date?: string): Date | undefined => {
  if (!date) {
    return undefined;
  }
  return new Date(Date.parse(date));
};

@Injectable()
export class FaturasService {
  constructor(
    @InjectRepository(Fatura)
    private faturaRepository: Repository<Fatura>,
  ) {}

  create(createFaturaDto: CreateFaturaDto) {
    const fatura = buildFatura(createFaturaDto);
    return this.faturaRepository.save(fatura);
  }

  findAll(): Promise<Fatura[]> {
    return this.faturaRepository.find();
  }

  async findOne(id: number) {
    return this.faturaRepository.findOneBy({ id }).then((res) => {
      if (!res) {
        throw new NotFoundException('Could not find using these filter');
      }
      return res;
    });
  }

  async update(id: number, updateFaturaDto: UpdateFaturaDto) {
    const oldItem = await this.faturaRepository.findOneBy({ id });
    if (!oldItem) {
      throw new NotFoundException(`Could not find object with id: ${id}`);
    }
    const mergedFatura = new Fatura();
    this.faturaRepository.merge(mergedFatura, oldItem, updateFaturaDto);
    const fatura = buildFatura(mergedFatura);
    await this.faturaRepository.update(id, fatura);
  }

  async remove(id: number) {
    await this.faturaRepository.delete(id);
  }

  async findByCliente(nCliente: string, startDate?: string, endDate?: string) {
    const parsedStartDate = parseDate(startDate);
    const parsedEndDate = parseDate(endDate);
    const extraWhere =
      parsedStartDate && parsedEndDate
        ? {
            mesReferencia: Between(parsedStartDate, parsedEndDate),
          }
        : parsedStartDate
          ? { mesReferencia: MoreThanOrEqual(parsedStartDate) }
          : parsedEndDate
            ? { mesReferencia: LessThanOrEqual(parsedEndDate) }
            : {};

    return this.faturaRepository
      .find({
        where: {
          nCliente,
          ...extraWhere,
        },
      })
      .then((res) => {
        if (res.length === 0) {
          throw new NotFoundException('Could not find using these filter');
        }
        return res;
      });
  }
}
