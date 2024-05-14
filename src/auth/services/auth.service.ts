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
    const { userName, email, password } = data;

    try {
      const userByEmail = await this.userService.getUserByEmail(email);
      if (!userByEmail) {
        const hash = await bcrypt.hash(password, 16);
        const newUser = {
          userName,
          email,
          password: hash,
        };
        const payload = {
          userName,
          email,
        };
        await this.userService.create(newUser);
        const token = this.jwtService.sign(payload);
        return {
          token,
        };
      }
      // return {
      //   ok: false,
      //   message: 'This email is registered',
      // };
      throw new BadRequestException({
        ok: false,
        message: 'This email is registered',
      });
    } catch (error) {
      throw new BadRequestException('new user could not be created', error);
    }
  }

  async validateUserPassword(userName: string, password: string) {
    const user = await this.userService.getUserByUserName(userName);
    if (user) {
      try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const { userName, email } = user;
          return {
            userName,
            email,
          };
        } else {
          throw new UnauthorizedException('Invalid credential');
        }
      } catch (error) {
        throw new UnauthorizedException('Invalid credential');
      }
    } else {
      throw new HttpException('user not found', 401);
    }
  }

  //login
  async login(data: LoginDTO) {
    try {
      const { userName, password } = data;
      const validUser = await this.validateUserPassword(userName, password);
      const payload = {
        userName: validUser.userName,
        email: validUser.email,
      };
      const token = this.jwtService.sign(payload);
      return {
        token,
      };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
