import { RecruitmentAggregate } from './recruitment';

export interface IRecruitmentRepository {
  save(r: RecruitmentAggregate): Promise<void>;
  getById(streamId: string): Promise<RecruitmentAggregate>;
}

export const RECRUITMENT_REPOSITORY_TOKEN = 'RecruitmentRepository';
