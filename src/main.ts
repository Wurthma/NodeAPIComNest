import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { CustomLogger } from './shared/services/custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule , { logger: new CustomLogger() });
  
  // Compress all data traffic
  app.use(compression());

  await app.listen(3000);
}
bootstrap();
