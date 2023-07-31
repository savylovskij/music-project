import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { Comment, Track } from './schemas';
import { CreateCommentDto, CreateTrackDto } from './dto';
import { FileService, FileType } from '../file';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private readonly trackModel: Model<Track>,
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    private readonly fileService: FileService,
  ) {}

  async create(
    createTrack: CreateTrackDto,
    picture: Express.Multer.File,
    audio: Express.Multer.File,
  ): Promise<Track> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);

    return await this.trackModel.create({
      ...createTrack,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });
  }

  async getAll(count = 10, offset = 0): Promise<Track[]> {
    return this.trackModel.find().skip(offset).limit(count);
  }

  async getOne(id: ObjectId): Promise<Track> {
    return this.trackModel.findById(id).populate('comments');
  }

  async delete(id: ObjectId): Promise<Track> {
    return this.trackModel.findByIdAndDelete(id);
  }

  async search(query: string): Promise<Track[]> {
    return this.trackModel
      .find({
        name: {
          $regex: new RegExp(query, 'i'),
        },
      })
      .limit(10);
  }

  async addComment(createComment: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(createComment.trackId);
    const comment = await this.commentModel.create(createComment);
    track.comments.push(comment.id);
    await track.save();

    return comment;
  }

  async listen(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id);
    track.listens++;
    track.save();

    return track;
  }
}
