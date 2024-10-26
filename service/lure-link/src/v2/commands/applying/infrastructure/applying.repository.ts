import { Injectable } from '@nestjs/common';
import { EventStoreService } from '../../common/event-store-service';
import { EventPublisher } from '@nestjs/cqrs';
import { IApplyingRepository } from '../domain/applying.repository';
import { ApplyingAggregate } from '../domain/applying';

@Injectable()
export class ApplyingRepository implements IApplyingRepository {
  constructor(
    private readonly eventStore: EventStoreService,
    private readonly publisher: EventPublisher,
  ) {}
  async save(r: ApplyingAggregate): Promise<void> {
    const uncommitedEvent = r.getUncommittedEvents();
    for (const e of uncommitedEvent) {
      const typeName = e.constructor.name;
      await this.eventStore.saveEvent(typeName, e, r.getStreamId());
    }
    const context = this.publisher.mergeObjectContext(r);
    context.commit();
    return Promise.resolve();
  }
  async getById(id: string): Promise<ApplyingAggregate> {
    const r = new ApplyingAggregate(id);
    const res = await this.eventStore.getEventsByAggregateId(r.getStreamId());
    r.loadFromHistory(res);
    return r;
  }
}
