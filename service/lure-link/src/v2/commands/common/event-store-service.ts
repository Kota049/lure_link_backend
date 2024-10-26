import { Inject, Injectable } from '@nestjs/common';
import { PRISMA_SERVICE_TOKEN, PrismaService } from './prisma-service';
import { EventTypes } from './event-type-decorator';
import { IEvent } from '@nestjs/cqrs';

@Injectable()
export class EventStoreService {
  constructor(
    @Inject(PRISMA_SERVICE_TOKEN)
    private readonly prisma: PrismaService,
  ) {}

  async saveEvent(type: string, payload: any, streamId: string): Promise<void> {
    await this.prisma.event.create({
      data: {
        type,
        payload,
        streamId,
      },
    });
    return;
  }

  async getEventsByAggregateId(streamId: string): Promise<IEvent[]> {
    const events = await this.prisma.event.findMany({
      where: { streamId: streamId },
    });
    return events.map((event) => {
      const EventClass = EventTypes.get(event.type);
      return new EventClass(...Object.values(event.payload));
    });
  }
}
