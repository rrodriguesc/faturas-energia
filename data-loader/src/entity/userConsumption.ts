import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserConsumption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nCliente: string;

  @Column({ type: "timestamptz" })
  mesReferencia: Date;

  @Column("float")
  qtdEnergiaEletrica: number;

  @Column("float")
  valorEnergiaEletrica: number;

  @Column("float")
  qtdEnergiaSCEEE: number;

  @Column("float")
  valorEnergiaSCEEE: number;

  @Column("float")
  qtdEnergiaCompensada: number;

  @Column("float")
  valorEnergiaCompensada: number;

  @Column("float")
  contribuicaoMunicipal: number;

  @Column("float")
  consumoEnergiaEletrica: number;

  @Column("float")
  energiaCompensada: number;

  @Column("float")
  valorTotalSemGD: number;

  @Column("float")
  economiaGD: number;
}
