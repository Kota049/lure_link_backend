import { z } from 'zod';
import { ValueObject } from '../../..//common/value-object.interface';

import { RecruitmentUnprocessableEntityException } from '../exceptions';
import dayjs from 'src/lib/dayjs';

export const EndDateTimeSchema = z.date();
export class EndDateTime extends ValueObject<string, Date> {
  validate(value: Date): string {
    try {
      const res = EndDateTimeSchema.parse(value);
      return dayjs(res).toISOString();
    } catch (error) {
      throw new RecruitmentUnprocessableEntityException(
        `EndDateTime : : ${error}`,
      );
    }
  }
  static from(value: Date): EndDateTime {
    return new EndDateTime(value);
  }
}
