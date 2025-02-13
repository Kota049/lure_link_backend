import { Global, Module } from '@nestjs/common';
import { CustomConfigService } from './config/custom-config-service';
import { AuthGuard } from './auth/auth.guard';

@Global()
@Module({
  providers: [CustomConfigService, AuthGuard],
  exports: [CustomConfigService, CustomConfigService],
})
export class CustomConfigModule {}
