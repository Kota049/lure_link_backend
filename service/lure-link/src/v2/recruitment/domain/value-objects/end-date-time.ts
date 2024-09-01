import { z } from 'zod';
import { ValueObject } from '../../..//common/value-object.interface';
import * as dayjs from 'dayjs';
import { RecruitmentUnprocessableEntityException } from '../exceptions';

export const EndDateTimeSchema = z.date();
export class EndDateTime extends ValueObject<string, Date> {
  validate(value: Date): string {
    try {
      const res = EndDateTimeSchema.parse(value);
      console.log(dayjs(res).toISOString());
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
