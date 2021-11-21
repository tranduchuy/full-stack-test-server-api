import {Injectable} from "@nestjs/common";
import {FireBaseService} from "src/firebase/firebase.service";
import {Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, RemoveEvent, UpdateEvent} from "typeorm";
import {Blog} from "./blog.entity";

@Injectable()
@EventSubscriber()
export class BlogSubcriber implements EntitySubscriberInterface<Blog> {
    constructor(
        private readonly connection: Connection,
        private firebaseService: FireBaseService,
    ) {
        this.connection.subscribers.push(this);
    }

    listenTo() {
        return Blog;
    }

    async afterInsert(event: InsertEvent<Blog>): Promise<void> {
        console.log('new blog was created', event.entity.id);
        const {id, ...rest} = event.entity;
        await this.firebaseService.setRecord('blog', id.toString(), rest)
    }

    async afterUpdate(event: UpdateEvent<Blog>): Promise<void> {
        console.log('blog aws updated successfully', event.entity.id);
        const {id, ...rest} = event.entity;
        await this.firebaseService.setRecord('blog', id.toString(), rest)
    }

    async afterRemove(event: RemoveEvent<Blog>): Promise<void> {
        if (event.entityId) {
            console.log(`Blog ${event.entityId} is deleted`);
            await this.firebaseService.deleteRecord('blog', event.entityId.toString());
        }
    }
}

