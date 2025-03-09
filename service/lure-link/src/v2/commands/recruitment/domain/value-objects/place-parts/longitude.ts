import { z } from 'zod';
import { ValueObject } from '../../../../common/value-object.interface';
import { RecruitmentUnprocessableEntityException } from '../../exceptions';
export const LongitudeSchema = z.string().min(1);

export class Longitude extends ValueObject<string, string> {
  static from(value: string): Longitude {
    return new Longitude(value);
  }
  validate(value: string): string {
    try {
      return LongitudeSchema.parse(value);
    } catch (error) {
      throw new RecruitmentUnprocessableEntityException(
        `Longitude : : ${error}`,
      );
    }
  }
}
