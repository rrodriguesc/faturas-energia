import { Module } from '@nestjs/common';
import { FaturasService } from './faturas.service';
import { FaturasController } from './faturas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fatura } from './entities/fatura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fatura])],
  controllers: [FaturasController],
  providers: [FaturasService],
  exports: [TypeOrmModule],
})
export class FaturasModule {}
