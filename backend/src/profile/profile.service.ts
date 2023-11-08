import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/interfaces/user.interface';
import { ChangePasswordDto } from './dto/change-password.dto';
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

      return user;
    } catch {
      throw new ConflictException('Error updating account settings');
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDto): Promise<void> {
    const { oldPassword, newPassword, id } = changePasswordDto;

    try {
      const user = await this.userModel.findOne({ id });

      if (user.password !== oldPassword) {
        throw new ConflictException('Incorrect password');
      }

      await this.userModel.findOneAndUpdate(
        { id },
        { password: newPassword },
        { new: true },
      );
    } catch {
      throw new ConflictException('Error changing password');
    }
  }
}
