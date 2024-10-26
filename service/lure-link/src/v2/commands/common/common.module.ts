import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PRISMA_SERVICE_TOKEN, PrismaService } from './prisma-service';
import { EventStoreService } from './event-store-service';
@Global()
@Module({
  imports: [CqrsModule],
  providers: [
    {
      provide: PRISMA_SERVICE_TOKEN,
      useClass: PrismaService,
    },
    PrismaService,
    EventStoreService,
  ],
  exports: [PrismaService, EventStoreService],
})
export class CommonModule {}
