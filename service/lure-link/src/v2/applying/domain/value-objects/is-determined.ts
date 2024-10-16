import { z } from 'zod';
import { ValueObject } from '../../../common/value-object.interface';
import { ApplyingStatusUnprocessableEntityException } from '../exceptions';

export const IsDeterminedSchema = z.boolean();
export class IsDetermined extends ValueObject<boolean, boolean> {
  static from(value: boolean): IsDetermined {
    return new IsDetermined(value);
  }
  validate(value: boolean): boolean {
    try {
      return IsDeterminedSchema.parse(value);
    } catch (error) {
      throw new ApplyingStatusUnprocessableEntityException(
        `IsDetermined : : ${error}`,
      );
    }
  }
}
