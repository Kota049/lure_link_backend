import { ValueObject } from '../../../common/value-object.interface';
import { z } from 'zod';
import { RecruitmentUnprocessableEntityException } from '../exceptions';
import { randomUUID } from 'crypto';

export const UserIdSchema = z.string().uuid();
export class UserId extends ValueObject<string, string> {
  static generate(): UserId {
    const id = randomUUID();
    return UserId.from(id);
  }
  static from(value: string): UserId {
    return new UserId(value);
  }
  validate(value: string): string {
    try {
      return UserIdSchema.parse(value);
    } catch (error) {
      throw new RecruitmentUnprocessableEntityException(`UserId : : ${error}`);
    }
  }
}
