import { z } from 'zod';
import { ValueObject } from '../../../../common/value-object.interface';
import { RecruitmentUnprocessableEntityException } from '../../exceptions';
export const AddresSchema = z.string().min(1);

export class Address extends ValueObject<string, string> {
  static from(value: string): Address {
    return new Address(value);
  }
  validate(value: string): string {
    try {
      return AddresSchema.parse(value);
    } catch (error) {
      throw new RecruitmentUnprocessableEntityException(`Address : : ${error}`);
    }
  }
}
