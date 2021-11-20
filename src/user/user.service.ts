import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FireBaseService} from "src/firebase/firebase.service";
import {Repository} from "typeorm";
import {SignUpReqDto} from "./dto/signUpReq.dto";
import {User} from "./user.entity";
import moment from 'moment';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private firebaseService: FireBaseService,
    ) {}


    async signUp(info: SignUpReqDto): Promise<User> {
        const existUser = await this.firebaseService.findUser(info.email);
        if (existUser) {
            throw new Error(`email ${info.email} already exists`);
        }

        await this.firebaseService.createByEmailPassword(info.email, info.password);

        return await this.usersRepository.save({
            name: info.name,
            email: info.email,
            birthday: info.birthday
        });
    }

}
