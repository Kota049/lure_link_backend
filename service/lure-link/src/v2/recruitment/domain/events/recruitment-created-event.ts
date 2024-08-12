import { IEvent } from '@nestjs/cqrs';
import { DomainEvent } from '../../../common/event-type-decorator';
@DomainEvent('RecruitmentCreatedEvent')
export class RecruitmentCreatedEvent implements IEvent {}
