import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  CreateApplyingCommand,
  DetermineApplyingCommand,
} from '../application';

@Controller('applying')
export class ApplyingControllers {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(@Body() req: CreateApplyingCommand): Promise<string> {
    const command = new CreateApplyingCommand(req);
    const res = await this.commandBus.execute<CreateApplyingCommand, string>(
      command,
    );
    return res;
  }
  @Post('determine')
  async determine(@Body() req: DetermineApplyingCommand): Promise<string> {
    const command = new DetermineApplyingCommand(req);
    const res = await this.commandBus.execute<DetermineApplyingCommand, string>(
      command,
    );
    return res;
  }
}
