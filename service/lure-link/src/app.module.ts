import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecruitmentModule } from './recruitment/recruitment.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CommonModule } from './common/common.module';

@Module({
  imports: [RecruitmentModule, CqrsModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
