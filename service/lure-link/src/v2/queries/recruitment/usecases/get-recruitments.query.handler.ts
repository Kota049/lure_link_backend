import { Inject } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RecruitmentProjectionUpdater } from '@prisma/client';
import {
  PRISMA_SERVICE_TOKEN,
  PrismaService,
} from 'src/v2/commands/common/prisma-service';

export class GetRecrutimentsQuery implements IQuery {
  constructor(props: GetRecrutimentsQuery) {
    Object.assign(this, props);
  }
  recruitmentIds: string[];
}
@QueryHandler(GetRecrutimentsQuery)
export class GetRecrutimentsQueryHandler
  implements IQueryHandler<GetRecrutimentsQuery>
{
  constructor(
    @Inject(PRISMA_SERVICE_TOKEN)
    private readonly prisma: PrismaService,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(
    query: GetRecrutimentsQuery,
  ): Promise<RecruitmentProjectionUpdater[]> {
    return this.prisma.recruitmentProjectionUpdater.findMany({
      include: {
        applyingProjectionUpdater: true,
      },
      where: {
        recruitmentId: {
          in: query.recruitmentIds,
        },
      },
      orderBy: {
        startDateTime: 'desc',
      },
    });
  }
}
