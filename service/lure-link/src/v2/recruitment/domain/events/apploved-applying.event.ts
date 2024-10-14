import { IEvent } from '@nestjs/cqrs';
import { DomainEvent } from '../../../common/event-type-decorator';
import { ApplyingId, RecruitmentId } from '../value-objects';
@DomainEvent('RecruitmentCreatedEvent')
export class ApprovedApplyingEvent implements IEvent {
  constructor(props: ApprovedApplyingEvent) {
    Object.assign(this, props);
  }
  recruitmentId: RecruitmentId;
  applyingId: ApplyingId;
}
