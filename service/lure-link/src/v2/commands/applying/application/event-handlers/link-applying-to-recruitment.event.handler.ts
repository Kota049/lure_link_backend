import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ApplyingDeterminedEvent } from '../../domain/events/applying-determined.event';
import { ApproveAppyingCommand } from '../../../recruitment/application/usecases/approve-applying.command';

@EventsHandler(ApplyingDeterminedEvent)
export class LinkApplyingToRecruitmentEventHandler
  implements IEventHandler<ApplyingDeterminedEvent>
{
  constructor(private readonly commandBus: CommandBus) {}
  async handle(event: ApplyingDeterminedEvent) {
    const command = {
      recruitmentId: event.recruitmentId,
      applyingId: event.applyingId,
    } as ApproveAppyingCommand;
    await this.commandBus.execute<ApproveAppyingCommand, string>(command);
    return;
  }
}
