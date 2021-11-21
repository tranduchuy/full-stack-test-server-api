import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BlogController} from './blog.controller';
import {Blog} from './blog.entity';
import {BlogService} from './blog.service';
import {BlogSubcriber} from './blog.subscriber';
import {FirebaseModule} from '../firebase/firebase.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Blog]),
        FirebaseModule,
    ],
    controllers: [BlogController],
    providers: [BlogService, BlogSubcriber],
})
export class BlogModule {}
