import { IEvent } from '@nestjs/cqrs';
import { DomainEvent } from '../../../common/event-type-decorator';
@DomainEvent('RecruitmentCreatedEvent')
export class RecruitmentCreatedEvent implements IEvent {
  recruitmentId: string;
  ownerId: string;
  destination: Place;
  depature: Place;
  startDate: string;
  endDate: string;
  maxParticipant: number;
  budget: number;
  description: string;
}

export interface Place {
  prefecture: string;
  address: string;
  description: string;
}
