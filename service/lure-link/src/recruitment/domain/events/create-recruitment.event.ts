import { IEvent } from '@nestjs/cqrs';

export class CreateRecruimentEvent implements IEvent {
  public aggregateId: string;
  public value: string;
}
