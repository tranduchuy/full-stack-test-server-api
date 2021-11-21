import {Body, Controller, HttpCode, Post, Get, Delete, Param, Put} from '@nestjs/common';
import {BlogService} from './blog.service';
import {CreateReqDto} from './dto/createReq.dto';
import {DetailReqDto} from './dto/detailReq.dto';
import {BlogList, BlogResDto} from './dto/listRes.dto';
import {UpdateBlogReqDto} from './dto/updateBlogReq.dto';

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) {}

    @Post()
    @HttpCode(201)
    create(@Body() body: CreateReqDto): Promise<BlogResDto> {
        return this.blogService.createOne(body);
    }

    @Get()
    @HttpCode(200)
    list(): Promise<BlogList> {
        return this.blogService.list();
    }

    @Delete('/:id')
    @HttpCode(200)
    async delete(@Param() params: DetailReqDto): Promise<void> {
        await this.blogService.deleteOne(Number(params.id));
    }

    @Put('/:id')
    @HttpCode(200)
    async update(
        @Body() body: UpdateBlogReqDto,
        @Param() params: DetailReqDto): Promise<BlogResDto> {
        return this.blogService.updateOne(Number(params.id), body);
    }

}
