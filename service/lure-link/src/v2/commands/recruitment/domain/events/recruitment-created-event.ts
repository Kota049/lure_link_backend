import { IEvent } from '@nestjs/cqrs';
import { DomainEvent } from '../../../common/event-type-decorator';
@DomainEvent('RecruitmentCreatedEvent')
export class RecruitmentCreatedEvent implements IEvent {
  constructor(props: RecruitmentCreatedEvent) {
    Object.assign(this, props);
  }
  recruitmentId: string;
  ownerId: string;
  destination: Place;
  depature: Place;
  startDate: string;
  endDate: string;
  maxParticipant: number;
  budget: number;
  description: string;
  applyingEndDateTime: string;
  created_at: string;
}

export interface Place {
  latitude: string;
  longitude: string;
  description: string;
}
