import { z } from 'zod';
import { ValueObject } from '../../../common/value-object.interface';
import * as dayjs from 'dayjs';
import { RecruitmentUnprocessableEntityException } from '../exceptions';

export const StartDateTimeSchema = z.date();
export class StartDateTime extends ValueObject<string, Date> {
  validate(value: Date): string {
    try {
      const res = StartDateTimeSchema.parse(value);
      console.log(dayjs(res).toISOString());
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
