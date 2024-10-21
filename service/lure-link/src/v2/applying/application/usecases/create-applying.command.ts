import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

import { Inject } from '@nestjs/common';
import dayjs from 'src/lib/dayjs';
import { Place } from 'src/v2/recruitment/domain/events/recruitment-created-event';
import {
  APPLYING_REPOSITORY_TOKEN,
  IApplyingRepository,
} from '../../domain/applying.repository';
import { ApplyingAggregate } from '../../domain/applying';

export class CreateApplyingCommand implements ICommand {
  recruitmentId: string;
  userId: string;
  firstPickUpOption: Place;
  secondPickUpOption?: Place | undefined;
  thirdPickUpOption?: Place | undefined;
}

@CommandHandler(CreateApplyingCommand)
export class CreateApplyingCommandHandler
  implements ICommandHandler<CreateApplyingCommand>
{
  constructor(
    @Inject(APPLYING_REPOSITORY_TOKEN)
    private readonly repo: IApplyingRepository,
  ) {}
  async execute(command: CreateApplyingCommand): Promise<string> {
    const currentDate = dayjs().toISOString();
    const aggregate = ApplyingAggregate.create({ ...command, currentDate });
    await this.repo.save(aggregate);
    return aggregate.applyingId.value;
  }
}
