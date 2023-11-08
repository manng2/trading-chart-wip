import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/interfaces/user.interface';
import { UpdateAccountSettingsDto } from './dto/update-account-settings.dto';

@Injectable()
export class ProfileService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async updateAccountSettings(
    updateAccountSettingsDto: UpdateAccountSettingsDto,
  ): Promise<IUser> {
    const { firstName, lastName, email, id } = updateAccountSettingsDto;

    try {
      const user = await this.userModel.findOneAndUpdate(
        { id },
        { firstName, lastName, email },
        { new: true },
      );

      console.log(user);

      return user;
    } catch {
      throw new ConflictException('Error updating account settings');
    }
  }
}
