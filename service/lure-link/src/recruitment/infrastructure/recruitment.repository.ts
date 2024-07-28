import { Injectable } from '@nestjs/common';
import { Recruitment } from '../domain/recruitment';
import { IRecruitmentRepository } from '../domain/recruitment.repository.interface';
@Injectable()
export class RecruitmentRepository extends IRecruitmentRepository {
  protected createAggregate(id: string): Recruitment {
    return new Recruitment(id);
  }
}
