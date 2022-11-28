import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateOrderDTO } from './dto/create-order-dto';
import { OrderCreatedDTO } from './dto/order-created-dto';

@Injectable()
export class ApiService {
  constructor(
    @Inject('ORDER_SERVICE') private readonly orderClient: ClientKafka,
  ) {}

  private readonly products: any[] = [
    {
      _id: '637b4e45238ae36ac93ee821',
      name: 'Yamaha Guitar',
      price: 45000,
      description:
        'Yamaha Music India Factory in Chennai is setup to produce Musical Instruments locally without compromising on QUALITY, DURABILITY & Reliability',
      createdAt: '1669025349283',
      updatedAt: '1669025349283',
    },
    {
      _id: '637b668cd9004a92cb7fc362',
      name: 'Iphone 14',
      price: 105000,
      description:
        'A15 Bionic, with a 5‑core GPU, powers all the latest features and makes graphically intense games and AR apps feel ultra fluid',
      createdAt: '1669031564467',
      updatedAt: '1669031564467',
    },
  ];

  createOrder({ productIds, userId }: CreateOrderDTO) {
    const products = productIds
      ?.map((id) => {
        return this.products.find((product) => product._id === id);
      })
      .filter((p) => p !== undefined);

    //TODO: Logic to check productIds in DB

    this.orderClient.emit(
      'order_created',
      new OrderCreatedDTO(products, userId),
    );
  }
}
