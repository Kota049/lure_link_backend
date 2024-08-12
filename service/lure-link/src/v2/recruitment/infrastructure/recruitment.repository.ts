import { Injectable } from '@nestjs/common';
import { RecruitmentAggregate } from '../domain/recruitment';
import { IRecruitmentRepository } from '../domain/recruitment.repository.interface';
import { EventStoreService } from '../../common/event-store-service';

@Injectable()
export class RecruitmentRepository implements IRecruitmentRepository {
  constructor(private readonly eventStore: EventStoreService) {}
  async save(r: RecruitmentAggregate): Promise<void> {
    const uncommitedEvent = r.getUncommittedEvents();
    for (const e of uncommitedEvent) {
      const typeName = e.constructor.name;
      await this.eventStore.saveEvent(typeName, e, r.getStreamId());
    }
    r.commit();
    return Promise.resolve();
  }
  async getById(id: string): Promise<RecruitmentAggregate> {
    const r = new RecruitmentAggregate(id);
    const res = await this.eventStore.getEventsByAggregateId(r.getStreamId());
    r.loadFromHistory(res);
    return r;
  }
}
