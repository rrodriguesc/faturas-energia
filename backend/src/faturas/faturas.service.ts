import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFaturaDto } from './dto/create-fatura.dto';
import { UpdateFaturaDto } from './dto/update-fatura.dto';
import { Fatura } from './entities/fatura.entity';

@Injectable()
export class FaturasService {
  constructor(
    @InjectRepository(Fatura)
    private faturaRepository: Repository<Fatura>,
  ) {}

  create(createFaturaDto: CreateFaturaDto) {
    return 'This action adds a new fatura';
  }

  findAll(): Promise<Fatura[]> {
    return this.faturaRepository.find();
  }

  findOne(id: number) {
    return this.faturaRepository.findOneBy({ id });
  }

  update(id: number, updateFaturaDto: UpdateFaturaDto) {
    return `This action updates a #${id} fatura`;
  }

  async remove(id: number) {
    await this.faturaRepository.delete(id);
  }
}
