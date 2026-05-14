import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:8080', // your React app URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  app.setGlobalPrefix('api'); // since your frontend calls /api/paypal/...

  await app.listen(3000);
}
bootstrap();