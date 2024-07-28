import { PrismaClient } from '@prisma/client';
import { EventBus } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { BaseAggregateRoot } from './base-aggregate-root';
import { PRISMA_SERVICE_TOKEN } from '../prisma';

@Injectable()
export abstract class BaseAggregateRootRepository<T extends BaseAggregateRoot> {
  constructor(
    @Inject(PRISMA_SERVICE_TOKEN)
    private readonly prisma: PrismaClient,
    private readonly eventBus: EventBus,
  ) {}

  async save(aggregate: T): Promise<void> {
    const events = aggregate.getUncommittedEvents();
    for (const event of events) {
      await this.prisma.event.create({
        data: {
          streamId: aggregate.getStreamId(),
          payload: event,
          updatedBy: 'system', // 必要に応じて設定
          version: aggregate.version++,
        },
      });
      this.eventBus.publish(event);
    }
    aggregate.commit();
  }

  async getById(id: string): Promise<T | null> {
    const events = await this.prisma.event.findMany({
      where: { streamId: id },
      orderBy: { createdAt: 'asc' },
    });

    if (events.length === 0) {
      return null;
    }

    const aggregate: T = this.createAggregate(id);
    const history = events.map((event) => event.payload);
    aggregate.loadFromHistory(history);
    return aggregate;
  }

  protected abstract createAggregate(id: string): T;
}
