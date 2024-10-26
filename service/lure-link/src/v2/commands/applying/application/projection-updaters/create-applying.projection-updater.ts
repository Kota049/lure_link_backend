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
        firstPickUpOptionPrefecture: event.firstPickUpOption.prefecture,
        firstPickUpOptionAddress: event.firstPickUpOption.address,
        firstPickUpOptionDescription: event.firstPickUpOption.description,
        status: 'APPLYING',
        secondPickUpOptionPrefecture:
          event.secondPickUpOption?.prefecture ?? '',
        secondPickUpOptionAddress: event.secondPickUpOption?.address ?? '',
        secondPickUpOptionDescription:
          event.secondPickUpOption?.description ?? '',
        thirdPickUpOptionPrefecture: event.thirdPickUpOption?.prefecture ?? '',
        thirdPickUpOptionAddress: event.thirdPickUpOption?.address ?? '',
        thirdPickUpOptionDescription:
          event.thirdPickUpOption?.description ?? '',
        determinePickUpOption: undefined,
        determinePickUpDateTime: undefined,
      },
    });
  }
}
