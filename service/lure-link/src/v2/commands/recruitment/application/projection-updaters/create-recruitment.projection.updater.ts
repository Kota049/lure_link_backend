import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  PRISMA_SERVICE_TOKEN,
  PrismaService,
} from 'src/v2/commands/common/prisma-service';
import { RecruitmentCreatedEvent } from '../../domain/events/recruitment-created-event';
import dayjs from 'src/lib/dayjs';

@EventsHandler(RecruitmentCreatedEvent)
export class CreateRecruitmentProjectoinUpdater
  implements IEventHandler<RecruitmentCreatedEvent>
{
  constructor(
    @Inject(PRISMA_SERVICE_TOKEN)
    private readonly prisma: PrismaService,
  ) {}
  async handle(event: RecruitmentCreatedEvent) {
    await this.prisma.recruitmentProjectionUpdater.create({
      data: {
        recruitmentId: event.recruitmentId,
        ownerId: event.ownerId,
        destinationLatitude: event.destination.latitude,
        destinationLongitude: event.destination.longitude,
        destinationPrefecture: '',
        destinationAddress: '',
        destinationDescription: event.destination.description,
        depatureLatitude: event.depature.latitude,
        depatureLongitude: event.depature.longitude,
        depaturePrefecture: '',
        depatureAddress: '',
        depatureDescription: event.depature.description,
        startDateTime: dayjs(event.startDate).toDate(),
        endDateTime: dayjs(event.endDate).toDate(),
        maxParticipant: event.maxParticipant,
        budget: event.budget,
        description: event.description,
        applyingEndDateTime: dayjs(event.applyingEndDateTime).toDate(),
      },
    });
  }
}
