import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repository/user.repository';
import { User } from '../entities/user.entity';
import { CreateUserDTO } from '../dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: UserRepository) {}

  async create(data: CreateUserDTO) {
    const newUser = this.userRepository.create(data);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async getUserByUserName(userName: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ userName });
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }
}
