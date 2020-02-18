import { Event } from "./event";

export class EventPage {
    startIndex: number;
    pageSize: number;
    events: Event[];

    constructor(startIndex: number, pageSize: number, events: Event[]) {
        this.startIndex = startIndex;
        this.pageSize = pageSize;
        this.events = events;
    }
}