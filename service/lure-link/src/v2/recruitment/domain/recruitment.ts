import { AggregateRoot } from '@nestjs/cqrs';
import { RecruitmentCreatedEvent } from './events/recruitment-created-event';
import { RecruitmentUpdatedEvent } from './events/recruitment-updated-event';

export class RecruitmentAggregate extends AggregateRoot {
  id: string;
  name: string;
  constructor(id: string) {
    super();
    this.id = id;
  }
  getStreamId(): string {
    return `Recruitment-${this.id}`;
  }

  create(event: RecruitmentCreatedEvent) {
    this.apply(event);
  }

  update(event: RecruitmentUpdatedEvent) {
    this.apply(event);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRecruitmentCreatedEvent(event: RecruitmentCreatedEvent) {
    this.name = 'initial';
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRecruitmentUpdatedEvent(event: RecruitmentUpdatedEvent) {
    this.name = 'updated';
  }
}
