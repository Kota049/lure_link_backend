import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplyingModule } from './v2/commands/applying/applying.module';
import { CommonModule } from './v2/commands/common/common.module';
import { RecruitmentController } from './v2/commands/recruitment/presentation/recruitment.controller';
import { RecruitmentModule } from './v2/commands/recruitment/recruitment.module';

@Module({
  imports: [CqrsModule, CommonModule, RecruitmentModule, ApplyingModule],
  controllers: [AppController, RecruitmentController],
  providers: [AppService],
})
export class AppModule {}
