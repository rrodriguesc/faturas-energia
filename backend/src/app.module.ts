import { Module } from '@nestjs/common';
import { FaturasModule } from './faturas/faturas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fatura } from './faturas/entities/fatura.entity';
import { FaturasController } from './faturas/faturas.controller';
import { FaturasService } from './faturas/faturas.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        entities: [Fatura],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    FaturasModule,
  ],
  controllers: [FaturasController],
  providers: [FaturasService],
})
export class AppModule {}
