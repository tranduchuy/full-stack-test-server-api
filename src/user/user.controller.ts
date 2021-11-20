import {Body, Controller, HttpCode, HttpException, HttpStatus, Post} from '@nestjs/common';
import {SignUpReqDto} from './dto/signUpReq.dto';
import {User} from './user.entity';
import {UserService} from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('/sign-up')
    @HttpCode(201)
    async signUp(@Body() data: SignUpReqDto): Promise<User> {
        try {
            return await this.userService.signUp(data);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }
}
