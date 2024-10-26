import { IEvent } from '@nestjs/cqrs';
import { DomainEvent } from '../../../common/event-type-decorator';
import { Place } from '../../../recruitment/domain/events/recruitment-created-event';
@DomainEvent('ApplyingCreatedEvent')
export class ApplyingCreatedEvent implements IEvent {
  constructor(props: ApplyingCreatedEvent) {
    Object.assign(this, props);
  }
  applyingId: string;
  recruitmentId: string;
  userId: string;
  firstPickUpOption: Place;
  secondPickUpOption?: Place | undefined;
  thirdPickUpOption?: Place | undefined;
  currentDate: string;
}
