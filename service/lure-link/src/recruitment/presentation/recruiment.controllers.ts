import { Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateRecruimentCommand } from '../application/usecase';

@Controller('recrutments')
export class RecruitmentController {
  constructor(private readonly commandBus: CommandBus) {}
  @Post()
  async create(): Promise<string> {
    const command = new CreateRecruimentCommand();
    const res = await this.commandBus.execute<CreateRecruimentCommand, string>(
      command,
    );
    return res;
  }
}
