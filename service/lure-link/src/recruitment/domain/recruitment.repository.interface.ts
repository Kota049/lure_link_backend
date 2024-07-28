import { BaseAggregateRootRepository } from '../../common/cqrs/base-aggregation-repository';
import { Recruitment } from './recruitment';

export abstract class IRecruitmentRepository extends BaseAggregateRootRepository<Recruitment> {}

export const RECRUITMENT_REPOSITORY_TOKEN = 'IRecruitmentRepository';
