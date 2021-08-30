import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { CustomLogger } from './shared/services/custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule , { logger: new CustomLogger() });
  
  // Compress all data traffic
  app.use(compression());

  // Open API (Swagger)
  const options = new DocumentBuilder()
    .setTitle('Petshop API')
    .setDescription('API de estudo de Node com Nest.')
    .setVersion('1.0.0')
    .addTag('petshop')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
