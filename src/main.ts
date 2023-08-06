import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // fix cors issue
  app.enableCors();



  await app.listen(PORT);
}
bootstrap();
