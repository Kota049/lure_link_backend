import { Module } from '@nestjs/common';
import { APPLYING_REPOSITORY_TOKEN } from './domain/applying.repository';
import { ApplyingRepository } from './infrastructure/applying.repository';
import {
  CreateApplyingCommandHandler,
  DetermineApplyingCommandHandler,
} from './application';
import { CqrsModule } from '@nestjs/cqrs';
import { LinkApplyingToRecruitmentEventHandler } from './application/event-handlers/link-applying-to-recruitment.event.handler';
import { ApplyingControllers } from './presentation/applying-controller';

@Module({
  imports: [CqrsModule],
  controllers: [ApplyingControllers],
  providers: [
    {
      provide: APPLYING_REPOSITORY_TOKEN,
      useClass: ApplyingRepository,
    },
    CreateApplyingCommandHandler,
    DetermineApplyingCommandHandler,
    LinkApplyingToRecruitmentEventHandler,
  ],
})
export class ApplyingModule {}
