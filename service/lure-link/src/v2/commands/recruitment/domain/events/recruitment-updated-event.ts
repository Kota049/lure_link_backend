import { IEvent } from '@nestjs/cqrs';
import { DomainEvent } from '../../../common/event-type-decorator';
@DomainEvent('RecruitmentUpdatedEvent')
export class RecruitmentUpdatedEvent implements IEvent {}
