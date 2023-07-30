import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Comment, Track } from './schemas';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private readonly trackModel: Model<Track>,
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  async create() {}
  async getAll() {}
  async getOne() {}
  async delete() {}
}
