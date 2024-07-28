import { AggregateRoot, IEvent } from '@nestjs/cqrs';

export abstract class BaseAggregateRoot extends AggregateRoot {
  private eventStreamId: string;
  public version: number = 0;

  constructor(private id: string) {
    super();
    this.eventStreamId = this.getEventStreamId();
  }

  abstract getEventStreamId(): string;

  loadFromHistory(events: IEvent[]) {
    events.forEach((event) => this.apply(event, true));
  }

  getId(): string {
    return this.id;
  }

  getStreamId(): string {
    return this.eventStreamId;
  }

  applyWithVersionUpdate(event: IEvent) {
    this.version++;
    this.apply(event);
  }
}
