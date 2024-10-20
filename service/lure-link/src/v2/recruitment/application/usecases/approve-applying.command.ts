import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import {
  IRecruitmentRepository,
  RECRUITMENT_REPOSITORY_TOKEN,
} from '../../domain/recruitment.repository.interface';
import { Inject } from '@nestjs/common';
import { RecruitmentAggregate } from '../../domain/recruitment';
import dayjs from 'src/lib/dayjs';

export class ApproveAppyingCommand implements ICommand {
  recruitmentId: string;
  applyingId: string;
}

@CommandHandler(ApproveAppyingCommand)
export class ApproveAppyingCommandHandler
  implements ICommandHandler<ApproveAppyingCommand>
{
  constructor(
    @Inject(RECRUITMENT_REPOSITORY_TOKEN)
    private readonly repo: IRecruitmentRepository,
  ) {}
  async execute(command: ApproveAppyingCommand): Promise<string> {}
}
