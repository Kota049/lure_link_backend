import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CommonModule } from './v2/common/common.module';
import { RecruitmentModule } from './v2/recruitment/recruitment.module';
import { RecruitmentController } from './v2/recruitment/presentation/recruitment.controller';
import { ApplyingModule } from './v2/applying/applying.module';

@Module({
  imports: [CqrsModule, CommonModule, RecruitmentModule, ApplyingModule],
  controllers: [AppController, RecruitmentController],
  providers: [AppService],
})
export class AppModule {}
