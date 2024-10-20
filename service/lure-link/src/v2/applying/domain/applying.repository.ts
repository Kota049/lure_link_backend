import { ApplyingAggregate } from './applying';

export interface IApplyingRepository {
  save(r: ApplyingAggregate): Promise<void>;
  getById(streamId: string): Promise<ApplyingAggregate>;
}

export const APPLYING_REPOSITORY_TOKEN = 'ApplyingRepository';
