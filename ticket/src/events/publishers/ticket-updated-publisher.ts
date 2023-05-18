import { Publisher, Subjects, TicketUpdatedEvent } from "@udemyms/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
}