import { z } from 'zod';
import { ValueObject } from '../../../../common/value-object.interface';
import { RecruitmentUnprocessableEntityException } from '../../exceptions';
export const LatitudeSchema = z.string().min(1);

export class Latitude extends ValueObject<string, string> {
  static from(value: string): Latitude {
    return new Latitude(value);
  }
  validate(value: string): string {
    try {
      return LatitudeSchema.parse(value);
    } catch (error) {
      throw new RecruitmentUnprocessableEntityException(
        `Latitude : : ${error}`,
      );
    }
  }
}
