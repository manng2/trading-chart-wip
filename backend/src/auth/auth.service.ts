import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/interfaces/user.interface';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async signup(signupDto: SignupDto) {
    const { firstName, lastName, password, email } = signupDto;
    const user = new this.userModel({
      firstName,
      lastName,
      password,
      email,
    });
    const isExists = !!(await this.userModel.findOne({ email }));

    if (isExists) {
      throw new ConflictException('User already exists');
    }

    await user.save();
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
