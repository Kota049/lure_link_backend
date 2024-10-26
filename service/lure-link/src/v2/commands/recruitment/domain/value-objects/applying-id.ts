import { ValueObject } from '../../../common/value-object.interface';
import { ulid } from 'ulid';
import { z } from 'zod';
import { RecruitmentUnprocessableEntityException } from '../exceptions';

export const ApplyingIdSchema = z.string().ulid();

export class ApplyingId extends ValueObject<string, string> {
  static generate(): ApplyingId {
    const id = ulid();
    return ApplyingId.from(id);
  }
  static from(value: string): ApplyingId {
    return new ApplyingId(value);
  }
  validate(value: string): string {
    try {
      return ApplyingIdSchema.parse(value);
    } catch (error) {
      throw new RecruitmentUnprocessableEntityException(
        `ApplicationId : : ${error}`,
      );
    }
  }
}
