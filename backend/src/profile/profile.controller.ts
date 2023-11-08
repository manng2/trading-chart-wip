import { Body, Controller, Put } from '@nestjs/common';
import { UpdateAccountSettingsDto } from './dto/update-account-settings.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Put('account-settings')
  async updateAccountSettings(
    @Body()
    updateAccountSettingsDto: UpdateAccountSettingsDto,
  ) {
    const user = await this.profileService.updateAccountSettings(
      updateAccountSettingsDto,
    );

    return {
      status: '200',
      message: 'Account settings updated successfully',
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user.id,
      },
    };
  }
}
