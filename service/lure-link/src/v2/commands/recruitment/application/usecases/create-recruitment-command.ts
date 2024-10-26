import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import {
  IRecruitmentRepository,
  RECRUITMENT_REPOSITORY_TOKEN,
} from '../../domain/recruitment.repository.interface';
import { Inject } from '@nestjs/common';
import { RecruitmentAggregate } from '../../domain/recruitment';
import {
  Place,
  RecruitmentCreatedEvent,
} from '../../domain/events/recruitment-created-event';
import dayjs from 'src/lib/dayjs';

export class CreateRecruitmentCommand implements ICommand {
  constructor(props: CreateRecruitmentCommand) {
    Object.assign(this, props);
  }
  ownerId: string;
  destination: Place;
  depature: Place;
  startDate: string;
  endDate: string;
  maxParticipant: number;
  budget: number;
  description: string;
  applyingEndDateTime: string;
}

@CommandHandler(CreateRecruitmentCommand)
export class CreateRecruitmentCommandHandler
  implements ICommandHandler<CreateRecruitmentCommand>
{
  constructor(
    @Inject(RECRUITMENT_REPOSITORY_TOKEN)
    private readonly repo: IRecruitmentRepository,
  ) {}
  async execute(command: CreateRecruitmentCommand): Promise<string> {
    const createdAt = dayjs().toISOString();
    const props: Omit<RecruitmentCreatedEvent, 'recruitmentId'> = {
      ...command,
      created_at: createdAt,
    };
    const aggregate = RecruitmentAggregate.create(props);
    await this.repo.save(aggregate);
    return aggregate.recruitmentId.value;
  }
}
