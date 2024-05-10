import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDTO } from 'src/user/dto/createUser.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginDTO } from '../dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() data: CreateUserDTO) {
    return this.authService.register(data);
  }

  @Post('login')
  login(@Body() data: LoginDTO) {
    return this.authService.login(data);
  }
}
