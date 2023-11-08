import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    const user = await this.authService.signup(signupDto);

    return {
      status: '201',
      message: 'Sign up successful',
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user.id,
      },
    };
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);

    return {
      status: '200',
      message: 'Login successful',
      data: user,
    };
  }
}
