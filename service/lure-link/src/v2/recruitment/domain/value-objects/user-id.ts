import { ulid } from 'ulid';
import { ValueObject } from '../../../common/value-object.interface';
import { z } from 'zod';
import { RecruitmentUnprocessableEntityException } from '../exceptions';

export const UserIdSchema = z.string().ulid();
export class UserId extends ValueObject<string, string> {
  static generate(): UserId {
    const id = ulid();
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
