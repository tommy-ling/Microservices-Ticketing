import { Subjects, PaymentCreatedEvent, Publisher } from "@udemyms/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated
}