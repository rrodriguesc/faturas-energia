import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserConsumption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nCliente: string;

  @Column()
  mesReferencia: string;

  @Column()
  qtdEnergiaEletrica: number;

  @Column()
  valorEnergiaEletrica: number;

  @Column()
  qtdEnergiaSCEEE: number;

  @Column()
  valorEnergiaSCEEE: number;

  @Column()
  qtdEnergiaCompensada: number;

  @Column()
  valorEnergiaCompensada: number;

  @Column()
  contribuicaoMunicipal: number;

  @Column()
  consumoEnergiaEletrica: number;

  @Column()
  energiaCompensada: number;

  @Column()
  valorTotalSemGD: number;

  @Column()
  economiaGD: number;
}
