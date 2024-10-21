import { Module } from '@nestjs/common';
import { APPLYING_REPOSITORY_TOKEN } from './domain/applying.repository';
import { ApplyingRepository } from './infrastructure/applying.repository';
import {
  CreateApplyingCommandHandler,
  DetermineApplyingCommandHandler,
} from './application';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [],
  providers: [
    {
      provide: APPLYING_REPOSITORY_TOKEN,
      useClass: ApplyingRepository,
    },
    CreateApplyingCommandHandler,
    DetermineApplyingCommandHandler,
  ],
})
export class ApplyingModule {}
