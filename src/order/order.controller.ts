import {
  Controller,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { EventPattern, Payload, ClientKafka } from '@nestjs/microservices';
import { OrderService } from './order.service';

@Controller()
export class OrderController implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly orderService: OrderService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  async onModuleInit() {
    const topics = ['get_user', 'test'];
    topics.forEach((topic) => this.authClient.subscribeToResponseOf(topic));
  }

  onModuleDestroy() {
    this.authClient.close();
  }

  @EventPattern('order_created')
  handleOrderCreated(@Payload() data: any) {
    this.orderService.handleOrderCreated(data);
  }
}
