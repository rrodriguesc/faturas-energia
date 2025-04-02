import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFaturaDto } from './dto/create-fatura.dto';
import { UpdateFaturaDto } from './dto/update-fatura.dto';
import { Fatura } from './entities/fatura.entity';

const buildFatura = (params: CreateFaturaDto) => {
  const fatura = new Fatura();
  fatura.nCliente = params.nCliente;
  fatura.mesReferencia = params.mesReferencia;
  fatura.qtdEnergiaEletrica = params.qtdEnergiaEletrica;
  fatura.valorEnergiaEletrica = params.valorEnergiaEletrica;
  fatura.qtdEnergiaSCEEE = params.qtdEnergiaSCEEE;
  fatura.valorEnergiaSCEEE = params.valorEnergiaSCEEE;
  fatura.qtdEnergiaCompensada = params.qtdEnergiaCompensada;
  fatura.valorEnergiaCompensada = params.valorEnergiaCompensada;
  fatura.contribuicaoMunicipal = params.contribuicaoMunicipal;
  fatura.consumoEnergiaEletrica =
    params.qtdEnergiaEletrica + params.qtdEnergiaSCEEE;
  fatura.energiaCompensada = params.qtdEnergiaCompensada;
  fatura.valorTotalSemGD =
    params.valorEnergiaEletrica +
    params.valorEnergiaSCEEE +
    params.contribuicaoMunicipal;
  fatura.economiaGD = params.valorEnergiaCompensada;
  return fatura;
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

  findOne(id: number) {
    return this.faturaRepository.findOneBy({ id });
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
}
