import { z } from 'zod';
import { ValueObject } from '../../../common/value-object.interface';
import { ApplyingUnprocessableEntityException } from '../exceptions';

export const DeterminedPickUpOptionNumberSchema = z
  .number()
  .min(1)
  .max(3)
  .int();
export class DeterminedPickUpOptionNumber extends ValueObject<number, number> {
  static from(value: number): DeterminedPickUpOptionNumber {
    return new DeterminedPickUpOptionNumber(value);
  }
  validate(value: number): number {
    try {
      return DeterminedPickUpOptionNumberSchema.parse(value);
    } catch (error) {
      throw new ApplyingUnprocessableEntityException(
        `determinedPickUpOptionNumber : : ${error}`,
      );
    }
  }
}
