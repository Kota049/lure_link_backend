import { Module } from '@nestjs/common';

import { CqrsModule } from '@nestjs/cqrs';
import { GetRecruitmentListQueryHandler } from './usecases/get-recruitment-list.query.handler';
import { GetRecrutimentsQueryHandler } from './usecases/get-recruitments.query.handler';
import {
  PRISMA_SERVICE_TOKEN,
  PrismaService,
} from 'src/v2/commands/common/prisma-service';
import { RecruitmentQueryController } from './presentations/recruitment.controller';

@Module({
  imports: [CqrsModule],
  controllers: [RecruitmentQueryController],
  providers: [
    {
      provide: PRISMA_SERVICE_TOKEN,
      useClass: PrismaService,
    },
    GetRecruitmentListQueryHandler,
    GetRecrutimentsQueryHandler,
  ],
})
export class RecruitmentQueryModule {}
