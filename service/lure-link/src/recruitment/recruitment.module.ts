import { Module } from '@nestjs/common';
import { RECRUITMENT_REPOSITORY_TOKEN } from './domain/recruitment.repository.interface';
import { RecruitmentRepository } from './infrastructure';
import { RecruitmentController } from './presentation/recruiment.controllers';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateRecruimentCommandHandler } from './application/usecase';

@Module({
  imports: [CqrsModule],
  controllers: [RecruitmentController],
  providers: [
    {
      provide: RECRUITMENT_REPOSITORY_TOKEN,
      useClass: RecruitmentRepository,
    },
    CreateRecruimentCommandHandler,
  ],
  exports: [],
})
export class RecruitmentModule {}
