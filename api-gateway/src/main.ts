import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './services/config/config.service';
import { ValidationPipe } from '@nestjs/common';
import {ExceptionsLoggerFilter} from "./utils/exceptionsLogger.filter";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('ISICOM API docs')
    //.addServer('https://pord.com.pe/api')
    .addServer('http://localhost:3000/'+process.env.GLOBAL_PREFIX)
    /*.addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )*/
    .addTag('transaction')
    .setVersion('0.5')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(process.env.GLOBAL_PREFIX_API, app, document);
  const globalPrefix = process.env.GLOBAL_PREFIX;
  app.setGlobalPrefix(globalPrefix);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionsLoggerFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe());
  console.log('API GATEWAY PORT => ', new ConfigService().get('port'));
  console.log('ANTIFRAUD SERVICE PORT => ', new ConfigService().get('antifraudService'));
  await app.listen(new ConfigService().get('port'));
}
bootstrap();
