import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for requests from the frontend (port 3000)
  app.enableCors({
    origin: 'http://localhost:3000', // Allow only the React app origin
    credentials: true, // Include credentials if needed (e.g., cookies)
  });

  await app.listen(4000); // Backend runs on port 4000
}
bootstrap();
