import { randomUUID } from 'crypto';
import { BaseAggregateRoot } from '../../common/cqrs/base-aggregate-root';
import { CreateRecruimentEvent } from './events/create-recruitment.event';

export class Recruitment extends BaseAggregateRoot {
  public value: string;
  getEventStreamId(): string {
    return `Recruitment-${this.getId()}`;
  }
  public static create(
    event: Omit<CreateRecruimentEvent, 'aggregateId'>,
  ): Recruitment {
    const id = randomUUID().toString();
    const recruitment = new Recruitment(id);
    recruitment.applyWithVersionUpdate(event);
    return recruitment;
  }

  onCreateRecruitmentEvent(event: CreateRecruimentEvent): void {
    this.value = event.value;
  }
}
