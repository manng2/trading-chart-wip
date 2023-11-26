import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChartLogModule } from './chart-log/chart-log.module';
import { ChartDataModule } from './chart-data/chart-data.module';

@Module({
  imports: [
    AuthModule,
    ProfileModule,
    ChartLogModule,
    ChartDataModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          uri: `mongodb+srv://${config.get('DATABASE_USER')}:${config.get(
            'DATABASE_PASSWORD',
          )}@cluster0.ckbyr09.mongodb.net/?retryWrites=true&w=majority`,
        };
      },
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
