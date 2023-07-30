import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';

import { TrackService } from './track.service';
import { CreateCommentDto, CreateTrackDto } from './dto';
import { Comment, Track } from './schemas';

@Controller('/tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrack: CreateTrackDto): Promise<Track> {
    return this.trackService.create(createTrack);
  }

  @Get()
  getAll(): Promise<Track[]> {
    return this.trackService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId): Promise<Track> {
    return this.trackService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId): Promise<Track> {
    return this.trackService.delete(id);
  }

  @Post('/comment')
  addComment(@Body() createComment: CreateCommentDto): Promise<Comment> {
    return this.trackService.addComment(createComment);
  }
}
