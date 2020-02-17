import { EntityRepository, Repository } from "typeorm";
import { Event } from "../models/event";

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {

    createAndSave(event: Event) {
        return this.manager.save(event);
    }
}