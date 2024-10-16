import { z } from 'zod';
import { ValueObject } from '../../../common/value-object.interface';
import { ApplyingStatusUnprocessableEntityException } from '../exceptions';

export const determinedPickUpOptionNumberSchema = z
  .number()
  .min(1)
  .max(3)
  .int();
export class determinedPickUpOptionNumber extends ValueObject<number, number> {
  static from(value: number): determinedPickUpOptionNumber {
    return new determinedPickUpOptionNumber(value);
  }
  validate(value: number): number {
    try {
      return determinedPickUpOptionNumberSchema.parse(value);
    } catch (error) {
      throw new ApplyingStatusUnprocessableEntityException(
        `determinedPickUpOptionNumber : : ${error}`,
      );
    }
  }
}
