import { ValueObject } from 'src/v2/common/value-object.interface';
import { ulid } from 'ulid';
import { z } from 'zod';

export const RecruitmentIdSchema = z.string().ulid();

export class RecruitmentId extends ValueObject<string, string> {
  static generate(): RecruitmentId {
    const id = ulid();
    return RecruitmentId.from(id);
  }
  static from(value: string): RecruitmentId {
    return new RecruitmentId(value);
  }
  validate(value: string): string {
    try {
      return RecruitmentIdSchema.parse(value);
    } catch (error) {
      // todo: エラーログどうしようかなあ
      console.log(`RecruitmentId : : ${error}`);
      throw error;
    }
  }
}
