import { Inject } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RecruitmentProjectionUpdater } from '@prisma/client';
import {
  PRISMA_SERVICE_TOKEN,
  PrismaService,
} from 'src/v2/commands/common/prisma-service';

export class GetRecruitmentListQuery implements IQuery {}
@QueryHandler(GetRecruitmentListQuery)
export class GetRecruitmentListQueryHandler
  implements IQueryHandler<GetRecruitmentListQuery>
{
  constructor(
    @Inject(PRISMA_SERVICE_TOKEN)
    private readonly prisma: PrismaService,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(_: GetRecruitmentListQuery): Promise<RecruitmentProjectionUpdater[]> {
    return this.prisma.recruitmentProjectionUpdater.findMany({
      include: {
        applyingProjectionUpdater: true,
      },
      orderBy: {
        startDateTime: 'desc',
      },
    });
  }
}
