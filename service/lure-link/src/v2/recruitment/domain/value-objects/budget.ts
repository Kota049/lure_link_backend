import { ValueObject } from '../../../common/value-object.interface';
import { z } from 'zod';
import { RecruitmentUnprocessableEntityException } from '../exceptions';

export const BudgetSchema = z.number().min(0).max(50000);

export class Budget extends ValueObject<number, number> {
  validate(value: number): number {
    try {
      return BudgetSchema.parse(value);
    } catch (error) {
      throw new RecruitmentUnprocessableEntityException(`Budget : : ${error}`);
    }
  }
  static from(value: number): Budget {
    return new Budget(value);
  }
}
