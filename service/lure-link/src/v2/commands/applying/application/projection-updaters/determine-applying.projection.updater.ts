import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  PRISMA_SERVICE_TOKEN,
  PrismaService,
} from 'src/v2/commands/common/prisma-service';
import { ApplyingDeterminedEvent } from '../../domain/events/applying-determined.event';
import dayjs from 'src/lib/dayjs';

@EventsHandler(ApplyingDeterminedEvent)
export class DetermineApplyingProjectoinUpdater
  implements IEventHandler<ApplyingDeterminedEvent>
{
  constructor(
    @Inject(PRISMA_SERVICE_TOKEN)
    private readonly prisma: PrismaService,
  ) {}
  async handle(event: ApplyingDeterminedEvent) {
    await this.prisma.applyingProjectionUpdater.update({
      where: {
        applyingId: event.applyingId,
      },
      data: {
        determinePickUpOption: event.selectPickUpOptionNumber,
        determinePickUpDateTime: dayjs(event.currentDate).toDate(),
        status: 'DETERMINE',
      },
    });
  }
}
