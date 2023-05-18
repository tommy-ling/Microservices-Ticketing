import { Subjects, Publisher, ExpirationCompleteEvent } from "@udemyms/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete
}