import { z } from 'zod';
import { ValueObject } from '../../../../common/value-object.interface';
import { RecruitmentUnprocessableEntityException } from '../../exceptions';

export const DescriptionSchema = z.string();
export class Description extends ValueObject<string, string> {
  static from(value: string): Description {
    return new Description(value);
  }
  validate(value: string): string {
    try {
      return DescriptionSchema.parse(value);
    } catch (error) {
      throw new RecruitmentUnprocessableEntityException(
        `Description : : ${error}`,
      );
    }
  }
}
