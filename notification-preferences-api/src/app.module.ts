
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PreferencesModule } from './preferences/preferences.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/notifications-api'),
    PreferencesModule,
    NotificationsModule,
  ],
})
export class AppModule {}
