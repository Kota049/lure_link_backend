import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplyingModule } from './v2/commands/applying/applying.module';
import { CommonModule } from './v2/commands/common/common.module';
import { RecruitmentController } from './v2/commands/recruitment/presentation/recruitment.controller';
import { RecruitmentModule } from './v2/commands/recruitment/recruitment.module';
import { RecruitmentQueryModule } from './v2/queries/recruitment/recruitment.query.module';
import { CustomConfigModule } from './v2/config/custom-config-module';
import { ClsModule } from 'nestjs-cls';
import { CatchEverythingFilter } from './filters/error-logger-filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    CqrsModule,
    CommonModule,
    RecruitmentModule,
    ApplyingModule,
    RecruitmentQueryModule,
    CustomConfigModule,
    ClsModule.forRoot({
      global: true, // 全体で有効にする
      middleware: { mount: true }, // 自動的にミドルウェアを適用
    }),
  ],
  controllers: [AppController, RecruitmentController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
  ],
})
export class AppModule {}
