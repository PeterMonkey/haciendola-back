import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDTO } from 'src/user/dto/createUser.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { LoginDTO } from '../dto/login.dto';
import { registerResponse, loginResponse } from '../response/auth.response';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiResponse(registerResponse.succes)
  @ApiResponse(registerResponse.badRequest)
  register(@Body() data: CreateUserDTO) {
    return this.authService.register(data);
  }

  @Post('login')
  @ApiResponse(loginResponse.succes)
  @ApiResponse(loginResponse.unauthorized)
  login(@Body() data: LoginDTO) {
    return this.authService.login(data);
  }
}
