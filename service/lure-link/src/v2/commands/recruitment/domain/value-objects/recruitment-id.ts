import { ValueObject } from '../../../common/value-object.interface';
import { ulid } from 'ulid';
import { z } from 'zod';
import { RecruitmentUnprocessableEntityException } from '../exceptions';

export const RecruitmentIdSchema = z.string().ulid();

export class RecruitmentId extends ValueObject<string, string> {
  static generate(): RecruitmentId {
    const id = ulid();
    return RecruitmentId.from(id);
  }
  static from(value: string): RecruitmentId {
    return new RecruitmentId(value);
  }
  validate(value: string): string {
    try {
      return RecruitmentIdSchema.parse(value);
    } catch (error) {
      throw new RecruitmentUnprocessableEntityException(
        `RecruitmentId : : ${error}`,
      );
    }
  }
}
