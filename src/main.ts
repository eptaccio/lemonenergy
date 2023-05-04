import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

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
  SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  setupDocs(app);

  const APP_PORT = 3000;
  await app.listen(APP_PORT);
}

bootstrap();
