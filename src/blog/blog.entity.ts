import {AfterInsert, AfterUpdate, Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity({
    name: 'blog'
})
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    imageSrc: string;
}
