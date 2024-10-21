import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

import { Inject } from '@nestjs/common';
import dayjs from 'src/lib/dayjs';
import { Place } from 'src/v2/recruitment/domain/events/recruitment-created-event';
import {
  APPLYING_REPOSITORY_TOKEN,
  IApplyingRepository,
} from '../../domain/applying.repository';
import { ApplyingAggregate } from '../../domain/applying';

export class DetermineApplyingCommand implements ICommand {
  applyingId: string;
  recruitmentId: string;
  selectPickUpOptionNumber: number;
  selectPickUpDateTime: string;
  currentDate: string;
}

@CommandHandler(DetermineApplyingCommand)
export class DetermineApplyingCommandHandler
  implements ICommandHandler<DetermineApplyingCommand>
{
  constructor(
    @Inject(APPLYING_REPOSITORY_TOKEN)
    private readonly repo: IApplyingRepository,
  ) {}
  async execute(command: DetermineApplyingCommand): Promise<string> {
    const currentDate = dayjs().toISOString();
    throw new Error();
  }
}
