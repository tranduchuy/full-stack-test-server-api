import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { CreateReqDto } from './dto/createReq.dto';
import { UpdateBlogReqDto } from './dto/updateBlogReq.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) {}

  async createOne(data: CreateReqDto): Promise<Blog> {
    return this.blogsRepository.save(data);
  }

  async list(): Promise<Blog[]> {
    return this.blogsRepository.find();
  }

  async deleteOne(id: number): Promise<Blog> {
    const blog = await this.blogsRepository.findOne(id);
    if (blog === undefined) {
      throw new Error('Blog not found');
    }

    return this.blogsRepository.remove(blog);
  }

  async updateOne(
    id: number,
    { title, content, imageSrc }: UpdateBlogReqDto,
  ): Promise<Blog> {
    const blog = await this.blogsRepository.findOne(id);
    if (blog === undefined) {
      throw new Error('Blog not found');
    }

    if (title) {
      blog.title = title;
    }
    if (imageSrc) {
      blog.imageSrc = imageSrc;
    }
    if (content) {
      blog.content = content;
    }
    return this.blogsRepository.save(blog);
  }
}
