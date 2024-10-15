import { IEvent } from '@nestjs/cqrs';
import { DomainEvent } from '../../../common/event-type-decorator';
@DomainEvent('RecruitmentCreatedEvent')
export class ApprovedApplyingEvent implements IEvent {
  constructor(props: ApprovedApplyingEvent) {
    Object.assign(this, props);
  }
  recruitmentId: string;
  applyingId: string;
  currentDate: string;
}
