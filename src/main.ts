import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

function buildDocsConfig(): Omit<OpenAPIObject, 'paths'> {
  const config = new DocumentBuilder()
    .setTitle('eligibility API')
    .setDescription('Calculates eligibility from possible clients')
    .setVersion('1.0')
    .addTag('eligibility')
    .build();

  return config;
}

function setupDocs(app: INestApplication): void {
  const documentConfig = buildDocsConfig();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const APP_PORT = 3000;

  setupDocs(app);

  await app.listen(APP_PORT);
}

bootstrap();
