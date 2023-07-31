import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';

import { TrackService } from './track.service';
import { CreateCommentDto, CreateTrackDto } from './dto';
import { Comment, Track } from './schemas';

@Controller('/tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(
    @UploadedFiles()
    files: {
      picture?: Express.Multer.File[];
      audio?: Express.Multer.File[];
    },
    @Body() createTrack: CreateTrackDto,
  ): Promise<Track> {
    const { picture, audio } = files;

    return this.trackService.create(createTrack, picture[0], audio[0]);
  }

  @Get()
  getAll(
    @Query('count') count: number,
    @Query('offset') offset: number,
  ): Promise<Track[]> {
    return this.trackService.getAll(count, offset);
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId): Promise<Track> {
    return this.trackService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId): Promise<Track> {
    return this.trackService.delete(id);
  }

  @Get('/search')
  search(@Query('query') query: string): Promise<Track[]> {
    return this.trackService.search(query);
  }

  @Post('/comment')
  addComment(@Body() createComment: CreateCommentDto): Promise<Comment> {
    return this.trackService.addComment(createComment);
  }

  @Post('listen/:id')
  listen(@Param('id') id: ObjectId): Promise<Track> {
    return this.trackService.listen(id);
  }
}
