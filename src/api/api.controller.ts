import { Body, Controller, Post } from '@nestjs/common';
import { ApiService } from './api.service';
import { CreateOrderDTO } from './dto/create-order-dto';

@Controller('api')
export class ApiController {
  constructor(private readonly appService: ApiService) {}

  @Post()
  createOrder(@Body() createOrderRequest: CreateOrderDTO) {
    this.appService.createOrder(createOrderRequest);
  }
}
