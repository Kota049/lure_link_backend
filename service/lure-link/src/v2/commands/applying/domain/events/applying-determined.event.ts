import { IEvent } from '@nestjs/cqrs';
import { DomainEvent } from '../../../common/event-type-decorator';
@DomainEvent('ApplyingDeterminedEvent')
export class ApplyingDeterminedEvent implements IEvent {
  constructor(props: ApplyingDeterminedEvent) {
    Object.assign(this, props);
  }
  applyingId: string;
  recruitmentId: string;
  selectPickUpOptionNumber: number;
  selectPickUpDateTime: string;
  currentDate: string;
}
