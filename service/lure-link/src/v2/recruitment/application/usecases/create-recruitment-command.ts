import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import {
  IRecruitmentRepository,
  RECRUITMENT_REPOSITORY_TOKEN,
} from '../../domain/recruitment.repository.interface';
import { Inject } from '@nestjs/common';
import { RecruitmentAggregate } from '../../domain/recruitment';
import { Place } from '../../domain/events/recruitment-created-event';

export class CreateRecruitmentCommand implements ICommand {
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(command: CreateRecruitmentCommand): Promise<string> {
    const id = 'hogehoge2';
    const r = new RecruitmentAggregate(id);
    // const event = new RecruitmentCreatedEvent();
    // r.create(event);
    // await this.repo.save(r);
    return 'id';
  }
}
