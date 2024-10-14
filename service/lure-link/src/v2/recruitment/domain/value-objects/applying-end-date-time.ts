import { z } from 'zod';
import { ValueObject } from '../../..//common/value-object.interface';

import { RecruitmentUnprocessableEntityException } from '../exceptions';
import dayjs from 'src/lib/dayjs';

export const ApplyingEndDateTimeSchema = z.date();
export class ApplyingEndDateTime extends ValueObject<string, Date> {
  validate(value: Date): string {
    try {
      const res = ApplyingEndDateTimeSchema.parse(value);
      return dayjs(res).toISOString();
    } catch (error) {
      throw new RecruitmentUnprocessableEntityException(
        `ApplyingEndDateTime : : ${error}`,
      );
    }
  }
  static from(value: Date): ApplyingEndDateTime {
    return new ApplyingEndDateTime(value);
  }
}
