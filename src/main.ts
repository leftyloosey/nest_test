import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationErrorFilter } from './mongo-validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ValidationErrorFilter());
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
