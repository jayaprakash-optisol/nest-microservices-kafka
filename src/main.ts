import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { logLevel } from 'kafkajs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
          logLevel: logLevel.ERROR,
        },
        consumer: {
          groupId: 'order-consumer',
        },
      },
    },
  );
  app.listen();
}
bootstrap();
