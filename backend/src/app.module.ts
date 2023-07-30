import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { TrackModule } from './track/track.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.kkm7otg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    ),
    TrackModule,
  ],
})
export class AppModule {}
