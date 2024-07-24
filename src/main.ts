import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // any property which is not metioned in DTO will be striped automatically, if DTO added
      stopAtFirstError: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
