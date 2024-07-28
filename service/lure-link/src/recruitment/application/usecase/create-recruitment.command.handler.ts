import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  IRecruitmentRepository,
  RECRUITMENT_REPOSITORY_TOKEN,
} from '../../domain/recruitment.repository.interface';
import { Inject } from '@nestjs/common';
import { Recruitment } from '../../domain/recruitment';

export class CreateRecruimentCommand {}

@CommandHandler(CreateRecruimentCommand)
export class CreateRecruimentCommandHandler
  implements ICommandHandler<CreateRecruimentCommand>
{
  constructor(
    @Inject(RECRUITMENT_REPOSITORY_TOKEN)
    private readonly recruitmentRepository: IRecruitmentRepository,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(_command: CreateRecruimentCommand): Promise<string> {
    const aggregate = Recruitment.create({
      value: 'hoge',
    });
    await this.recruitmentRepository.save(aggregate);
    return aggregate.getId();
  }
}
