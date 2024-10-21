import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

import { Inject } from '@nestjs/common';
import dayjs from 'src/lib/dayjs';
import {
  APPLYING_REPOSITORY_TOKEN,
  IApplyingRepository,
} from '../../domain/applying.repository';

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
    const aggregate = await this.repo.getById(command.applyingId);
    aggregate.determinePickUp({ ...command, currentDate });
    await this.repo.save(aggregate);
    return aggregate.applyingId.value;
  }
}
