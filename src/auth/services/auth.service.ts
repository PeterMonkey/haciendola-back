import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/user/dto/createUser.dto';
import { UserService } from 'src/user/services/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(data: CreateUserDTO) {
    const { name, email, password } = data;

    try {
      const userByEmail = await this.userService.getUserByEmail(email);
      if (!userByEmail) {
        const hash = await bcrypt.hash(password, 16);
        const newUser = {
          name,
          email,
          password: hash,
        };
        const payload = {
          name,
          email,
        };
        await this.userService.create(newUser);
        const token = this.jwtService.sign(payload);
        return {
          token,
        };
      }
      return {
        ok: false,
        message: 'This email is registered',
      };
    } catch (error) {
      throw new BadRequestException('new user could not be created', error);
    }
  }

  async validateUserPassword(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (user) {
      try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const { name, email } = user;
          return {
            name,
            email,
          };
        } else {
          throw new UnauthorizedException('Invalid credential');
        }
      } catch (error) {
        throw new HttpException('Invalid credential', 301);
      }
    } else {
      throw new HttpException('user not found', 301);
    }
  }

  //login
  async login(data: LoginDTO) {
    try {
      const { email, password } = data;
      const validUser = await this.validateUserPassword(email, password);
      const payload = {
        name: validUser.name,
        email: validUser.email,
      };
      const token = this.jwtService.sign(payload);
      return {
        token,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
