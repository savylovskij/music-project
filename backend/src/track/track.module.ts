import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { Comment, CommentSchema, Track, TrackSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Track.name,
        schema: TrackSchema,
      },
      {
        name: Comment.name,
        schema: CommentSchema,
      },
    ]),
  ],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
