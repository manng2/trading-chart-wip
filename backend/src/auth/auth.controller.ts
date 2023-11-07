import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return {
      status: '201',
      message: 'Sign up successful',
      data: signupDto,
    };
  }
}
