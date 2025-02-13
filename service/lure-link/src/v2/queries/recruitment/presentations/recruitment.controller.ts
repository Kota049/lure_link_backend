import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetRecruitmentListQuery } from '../usecases/get-recruitment-list.query.handler';
import { RecruitmentProjectionUpdater } from '@prisma/client';
import { GetRecrutimentsQuery } from '../usecases/get-recruitments.query.handler';
import { AuthGuard } from 'src/v2/config/auth/auth.guard';
import { ClsService } from 'nestjs-cls';

@Controller('recruitments')
export class RecruitmentQueryController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly cls: ClsService,
  ) {}
  @Get('/')
  @UseGuards(AuthGuard)
  async getAll(): Promise<RecruitmentProjectionUpdater[]> {
    console.log(JSON.stringify(this.cls.get<{ sub: string }>('user')));
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
