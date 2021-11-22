import { CreateReqDto } from './createReq.dto';

export class BlogResDto extends CreateReqDto {
  id: number;
}

export type BlogList = BlogResDto[];
