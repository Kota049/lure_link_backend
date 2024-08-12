import { Module } from '@nestjs/common';
import { RecruitmentController } from './presentation/recruitment.controller';
import { RECRUITMENT_REPOSITORY_TOKEN } from './domain/recruitment.repository.interface';
import { RecruitmentRepository } from './infrastructure/recruitment.repository';
import { CreateRecruitmentCommandHandler } from './application/usecases/create-recruitment-command';
import { UpdateRecruitmentCommandHandler } from './application/usecases/update-recruitment-command';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [RecruitmentController],
  providers: [
    {
      provide: RECRUITMENT_REPOSITORY_TOKEN,
      useClass: RecruitmentRepository,
    },
    CreateRecruitmentCommandHandler,
    UpdateRecruitmentCommandHandler,
  ],
})
export class RecruitmentModule {}
