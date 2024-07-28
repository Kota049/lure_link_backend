import { Global, Module } from '@nestjs/common';
import { PRISMA_SERVICE_TOKEN, PrismaService } from './prisma/prisma-service';
import { CqrsModule } from '@nestjs/cqrs';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: PRISMA_SERVICE_TOKEN,
      useClass: PrismaService,
    },
  ],
  exports: [
    {
      provide: PRISMA_SERVICE_TOKEN,
      useClass: PrismaService,
    },
  ],
})
export class CommonModule {}
