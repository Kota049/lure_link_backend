import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateRecruitmentCommand } from '../application/usecases/create-recruitment-command';

@Controller('recruitments')
export class RecruitmentController {
  constructor(private readonly commandBus: CommandBus) {}
  @Post('/')
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
