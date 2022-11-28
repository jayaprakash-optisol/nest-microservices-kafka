import { Inject, Injectable } from '@nestjs/common';
import { OrderCreatedDTO } from './dto/order-created-dto';
import { ClientKafka } from '@nestjs/microservices';
import { GetUserDTO } from './dto/get-user-dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  handleOrderCreated({ products, userId }: OrderCreatedDTO) {
    this.authClient
      .send('get_user', new GetUserDTO(userId))
      .subscribe((user) => {
        // LOGIC to store in created order in DB
        user
          ? console.log(`Order Created`, products)
          : console.log('Failed to place order');
      });
  }
}
