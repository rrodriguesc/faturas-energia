import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FaturasService } from './faturas.service';
import { CreateFaturaDto } from './dto/create-fatura.dto';
import { UpdateFaturaDto } from './dto/update-fatura.dto';

@Controller('faturas')
export class FaturasController {
  constructor(private readonly faturasService: FaturasService) {}

  @Post()
  create(@Body() createFaturaDto: CreateFaturaDto) {
    return this.faturasService.create(createFaturaDto);
  }

  @Get()
  findAll() {
    return this.faturasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faturasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFaturaDto: UpdateFaturaDto) {
    return this.faturasService.update(+id, updateFaturaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.faturasService.remove(+id);
  }

  @Get('/cliente/:nCliente')
  findByCliente(
    @Param('nCliente') nCliente: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.faturasService.findByCliente(nCliente, startDate, endDate);
  }
}
