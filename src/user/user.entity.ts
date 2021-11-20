import {Column, Entity, EntitySchema, PrimaryGeneratedColumn, UsingJoinColumnOnlyOnOneSideAllowedError} from 'typeorm';

@Entity({
    name: 'users',
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    birthday: Date;

    @Column({unique: true})
    email: string;

    @Column()
    hasedPassword: string;
}

