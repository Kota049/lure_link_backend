import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CommonModule } from './v2/common/common.module';
import { RecruitmentModule } from './v2/recruitment/recruitment.module';
import { RecruitmentController } from './v2/recruitment/presentation/recruitment.controller';

@Module({
  imports: [CqrsModule, CommonModule, RecruitmentModule],
  controllers: [AppController, RecruitmentController],
  providers: [AppService],
})
export class AppModule {}
