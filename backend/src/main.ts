import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export default async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
