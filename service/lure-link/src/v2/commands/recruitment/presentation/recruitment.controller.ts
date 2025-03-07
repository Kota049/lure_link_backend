import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateRecruitmentCommand } from '../application/usecases/create-recruitment-command';
import { AuthGuard } from 'src/v2/config/auth/auth.guard';

@Controller('recruitments')
export class RecruitmentController {
  constructor(private readonly commandBus: CommandBus) {}
  @Post('/')
  @UseGuards(AuthGuard)
  async create(@Body() req: CreateRecruitmentCommand): Promise<string> {
    const command = new CreateRecruitmentCommand(req);
    const res = await this.commandBus.execute<CreateRecruitmentCommand, string>(
      command,
    );
    return res;
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
