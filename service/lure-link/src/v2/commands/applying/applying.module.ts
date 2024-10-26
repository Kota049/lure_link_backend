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
import { CreateApplyingProjectoinUpdater } from './application/projection-updaters/create-applying.projection-updater';
import { PRISMA_SERVICE_TOKEN, PrismaService } from '../common/prisma-service';
import { DetermineApplyingProjectoinUpdater } from './application/projection-updaters/determine-applying.projection.updater';

@Module({
  imports: [CqrsModule],
  controllers: [ApplyingControllers],
  providers: [
    {
      provide: APPLYING_REPOSITORY_TOKEN,
      useClass: ApplyingRepository,
    },
    {
      provide: PRISMA_SERVICE_TOKEN,
      useClass: PrismaService,
    },
    CreateApplyingCommandHandler,
    DetermineApplyingCommandHandler,
    LinkApplyingToRecruitmentEventHandler,
    CreateApplyingProjectoinUpdater,
    DetermineApplyingProjectoinUpdater,
  ],
})
export class ApplyingModule {}
