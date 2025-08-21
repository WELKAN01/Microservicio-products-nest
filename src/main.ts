import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { MicroserviceOptions, NestMicroservice, Transport } from '@nestjs/microservices';

async function bootstrap() {
  var logger = new Logger('Bootstrap');
  //onst app = await NestFactory.create(AppModule);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        url: `localhost:${envs.port}`,
        port: envs.port,
        retryAttempts: 5,
        retryDelay: 3000,
      },
    }
  )
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )
  // await app.listen(envs.port);
  await app.listen();
  logger.log(`Application is running on: http://localhost:${envs.port}`);
}
bootstrap();
