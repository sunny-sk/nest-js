import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // any property which is not metioned in DTO will be striped automatically, if DTO added
      stopAtFirstError: true,
    }),
  );
  app.use(helmet());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
