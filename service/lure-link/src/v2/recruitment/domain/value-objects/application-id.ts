import { ValueObject } from '../../../common/value-object.interface';
import { ulid } from 'ulid';
import { z } from 'zod';
import { RecruitmentUnprocessableEntityException } from '../exceptions';

export const ApplicationIdSchema = z.string().ulid();

export class ApplicationId extends ValueObject<string, string> {
  static generate(): ApplicationId {
    const id = ulid();
    return ApplicationId.from(id);
  }
  static from(value: string): ApplicationId {
    return new ApplicationId(value);
  }
  validate(value: string): string {
    try {
      return ApplicationIdSchema.parse(value);
    } catch (error) {
      throw new RecruitmentUnprocessableEntityException(
        `ApplicationId : : ${error}`,
      );
    }
  }
}
