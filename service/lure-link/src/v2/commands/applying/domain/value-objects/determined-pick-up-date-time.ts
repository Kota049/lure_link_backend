import { z } from 'zod';
import { ValueObject } from '../../..//common/value-object.interface';

import dayjs from 'src/lib/dayjs';
import { ApplyingUnprocessableEntityException } from '../exceptions';

export const DeterminedPickUpDateTimeSchema = z.date();
export class DeterminedPickUpDateTime extends ValueObject<string, Date> {
  validate(value: Date): string {
    try {
      const res = DeterminedPickUpDateTimeSchema.parse(value);
      return dayjs(res).toISOString();
    } catch (error) {
      throw new ApplyingUnprocessableEntityException(
        `PickUpDateTime : : ${error}`,
      );
    }
  }
  static from(value: Date): DeterminedPickUpDateTime {
    return new DeterminedPickUpDateTime(value);
  }
}
