import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RecruitmentCreatedEvent } from '../../domain/events/recruitment-created-event';

@EventsHandler(RecruitmentCreatedEvent)
export class UpsertRecruitmentProjectionUpdater
  implements IEventHandler<RecruitmentCreatedEvent>
{
  handle(event: RecruitmentCreatedEvent) {
    console.log('+++++++++++++++++++++');
    console.log(event);
  }
}
