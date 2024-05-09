import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repository/user.repository';
import { User } from '../entities/user.entity';
import { CreateUserDTO } from '../dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: UserRepository) {}

  async create(data: CreateUserDTO) {
    const { name, email, password } = data;
    try {
      const user = await this.userRepository.findOneBy({ email });
      if (!user) {
        const hash = bcrypt.hashSync(password, 16);
        const newUser = this.userRepository.create({
          name,
          email,
          password: hash,
        });
        await this.userRepository.save(newUser);
        return {
          ok: true,
          message: 'new user created',
        };
      }
      return {
        ok: false,
        message: 'user already exists',
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
