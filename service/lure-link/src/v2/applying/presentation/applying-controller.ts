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
    const res = await this.commandBus.execute<CreateApplyingCommand, string>(
      req,
    );
    return res;
  }
  @Post('determine')
  async determine(@Body() req: DetermineApplyingCommand): Promise<string> {
    const res = await this.commandBus.execute<DetermineApplyingCommand, string>(
      req,
    );
    return res;
  }
}
