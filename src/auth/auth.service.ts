import { Injectable } from '@nestjs/common';
import { GetUserDTO } from './dto/get-user-dto';

@Injectable()
export class AuthService {
  private readonly users: any[] = [
    { userId: '1', txId: '76a3eada-493f-4474-8922-e946fd6dcb04' },
    { userId: '2', txId: 'fd7a33d1-06bb-41a0-8221-21f9517e91f3' },
  ];

  getUser({ userId }: GetUserDTO) {
    //Auth handlers here
    return this.users?.find((user) => user.userId === userId) || null;
  }
}
