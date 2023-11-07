import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    await this.authService.signup(signupDto);

    return {
      status: '201',
      message: 'Sign up successful',
    };
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    await this.authService.login(loginDto);

    return {
      status: '200',
      message: 'Login successful',
    };
  }
}
