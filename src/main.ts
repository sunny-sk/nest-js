import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';
const cookieSession = require('cookie-session');

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
  app.use(cookieSession({
    keys: ['somerandomkeysnamefornestjsapp'],  // secret
    maxAge: 24 * 60 * 60 * 1000 * 30 // 30 days 
  }))
  await app.listen(3000);
}
bootstrap();
