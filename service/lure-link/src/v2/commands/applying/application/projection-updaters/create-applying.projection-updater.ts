import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ApplyingCreatedEvent } from '../../domain/events/applying-created.event';
import { Inject } from '@nestjs/common';
import {
  PRISMA_SERVICE_TOKEN,
  PrismaService,
} from 'src/v2/commands/common/prisma-service';

@EventsHandler(ApplyingCreatedEvent)
export class CreateApplyingProjectoinUpdater
  implements IEventHandler<ApplyingCreatedEvent>
{
  constructor(
    @Inject(PRISMA_SERVICE_TOKEN)
    private readonly prisma: PrismaService,
  ) {}
  async handle(event: ApplyingCreatedEvent) {
    await this.prisma.applyingProjectionUpdater.create({
      data: {
        applyingId: event.applyingId,
        recruitmentId: event.recruitmentId,
        userId: event.userId,
        firstPickUpOptionPrefecture: event.firstPickUpOption.latitude,
        firstPickUpOptionAddress: event.firstPickUpOption.longitude,
        firstPickUpOptionDescription: event.firstPickUpOption.description,
        status: 'APPLYING',
        secondPickUpOptionPrefecture: event.secondPickUpOption?.latitude ?? '',
        secondPickUpOptionAddress: event.secondPickUpOption?.longitude ?? '',
        secondPickUpOptionDescription:
          event.secondPickUpOption?.description ?? '',
        thirdPickUpOptionPrefecture: event.thirdPickUpOption?.latitude ?? '',
        thirdPickUpOptionAddress: event.thirdPickUpOption?.longitude ?? '',
        thirdPickUpOptionDescription:
          event.thirdPickUpOption?.description ?? '',
        determinePickUpOption: undefined,
        determinePickUpDateTime: undefined,
      },
    });
  }
}
