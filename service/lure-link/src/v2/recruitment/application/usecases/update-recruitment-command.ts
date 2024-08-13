import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import {
  IRecruitmentRepository,
  RECRUITMENT_REPOSITORY_TOKEN,
} from '../../domain/recruitment.repository.interface';
import { Inject } from '@nestjs/common';
import { RecruitmentUpdatedEvent } from '../../domain/events/recruitment-updated-event';

export class UpdateRecruitmentCommand implements ICommand {}

@CommandHandler(UpdateRecruitmentCommand)
export class UpdateRecruitmentCommandHandler
  implements ICommandHandler<UpdateRecruitmentCommand>
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(
    @Inject(RECRUITMENT_REPOSITORY_TOKEN)
    private readonly repo: IRecruitmentRepository,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(command: UpdateRecruitmentCommand): Promise<string> {
    const id = 'hogehoge2';
    const r = await this.repo.getById(id);
    const event = new RecruitmentUpdatedEvent();
    r.update(event);
    await this.repo.save(r);
    return r.id;
  }
}
