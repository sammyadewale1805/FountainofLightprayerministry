import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'https://fountainof-lightprayerministry.vercel.app',
      'http://localhost:5173',
      'http://localhost:8080',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;

  await app.listen(port, '0.0.0.0'); // 👈 ADD THIS
}

bootstrap();