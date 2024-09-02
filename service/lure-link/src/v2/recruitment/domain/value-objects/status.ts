import { ValueObject } from '../../../common/value-object.interface';
import { z } from 'zod';
import { RecruitmentUnprocessableEntityException } from '../exceptions';

export const StatusValue = {
  APPLYING: 0,
  FIXED: 1,
  FINISHED: 2,
  CANCEL: 3,
};

export type StatusValue = (typeof StatusValue)[keyof typeof StatusValue];

export const StatusSchema = z.nativeEnum(StatusValue);

export class Status extends ValueObject<StatusValue, number> {
  validate(value: number): StatusValue {
    try {
      const res = StatusSchema.parse(value);
      return res;
    } catch (error) {
      throw new RecruitmentUnprocessableEntityException(`Status : : ${error}`);
    }
  }
  static from(value: number): Status {
    return new Status(value);
  }
}
