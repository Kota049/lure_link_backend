import { z } from 'zod';
import { ValueObject } from '../../../common/value-object.interface';

import { RecruitmentUnprocessableEntityException } from '../exceptions';
import dayjs from 'src/lib/dayjs';

export const StartDateTimeSchema = z.date();
export class StartDateTime extends ValueObject<string, Date> {
  validate(value: Date): string {
    try {
      const res = StartDateTimeSchema.parse(value);
      return dayjs(res).toISOString();
    } catch (error) {
      throw new RecruitmentUnprocessableEntityException(
        `StartDateTime : : ${error}`,
      );
    }
  }
  static from(value: Date): StartDateTime {
    return new StartDateTime(value);
  }
}
