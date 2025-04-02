import { Module } from '@nestjs/common';
import { FaturasModule } from './faturas/faturas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fatura } from './faturas/entities/fatura.entity';
import { FaturasController } from './faturas/faturas.controller';
import { FaturasService } from './faturas/faturas.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      entities: [Fatura],
      synchronize: true,
    }),
    FaturasModule,
  ],
  controllers: [FaturasController],
  providers: [FaturasService],
})
export class AppModule {}
