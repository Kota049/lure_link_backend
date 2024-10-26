import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetRecruitmentListQuery } from '../usecases/get-recruitment-list.query.handler';
import { RecruitmentProjectionUpdater } from '@prisma/client';
import { GetRecrutimentsQuery } from '../usecases/get-recruitments.query.handler';

@Controller('recruitments')
export class RecruitmentQueryController {
  constructor(private readonly queryBus: QueryBus) {}
  @Get('/')
  async getAll(): Promise<RecruitmentProjectionUpdater[]> {
    const query = new GetRecruitmentListQuery();
    const res = await this.queryBus.execute<
      GetRecruitmentListQuery,
      RecruitmentProjectionUpdater[]
    >(query);
    return res;
  }
  @Get(':id')
  async get(@Param('id') id: string): Promise<RecruitmentProjectionUpdater> {
    const query = new GetRecrutimentsQuery({ recruitmentIds: [id] });
    const res = await this.queryBus.execute<
      GetRecruitmentListQuery,
      RecruitmentProjectionUpdater[]
    >(query);
    if (res.length === 0) {
      throw new NotFoundException(`Cannnot find any Recruitment : id : ${id}`);
    }
    return res[0];
  }
  // @Post('/update')
  // async update(): Promise<string> {
  //   const command = new UpdateRecruitmentCommand();
  //   const res = await this.commandBus.execute<UpdateRecruitmentCommand, string>(
  //     command,
  //   );
  //   return res;
  // }
}
