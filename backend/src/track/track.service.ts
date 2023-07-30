import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { Comment, Track } from './schemas';
import { CreateCommentDto, CreateTrackDto } from './dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private readonly trackModel: Model<Track>,
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  async create(createTrack: CreateTrackDto): Promise<Track> {
    return await this.trackModel.create({ ...createTrack, listens: 0 });
  }

  async getAll(): Promise<Track[]> {
    return this.trackModel.find();
  }

  async getOne(id: ObjectId): Promise<Track> {
    return this.trackModel.findById(id).populate('comments');
  }

  async delete(id: ObjectId): Promise<Track> {
    return this.trackModel.findByIdAndDelete(id);
  }

  async addComment(createComment: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(createComment.trackId);
    const comment = await this.commentModel.create(createComment);
    track.comments.push(comment.id);
    await track.save();

    return comment;
  }
}
