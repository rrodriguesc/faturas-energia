import { DataSource } from 'typeorm';
import { Fatura } from './fatura.entity';

export const faturaProviders = [
  {
    provide: 'FATURA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Fatura),
    inject: ['DATA_SOURCE'],
  },
];
