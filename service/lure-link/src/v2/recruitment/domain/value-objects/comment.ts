import { z } from 'zod';
import { ValueObject } from '../../../common/value-object.interface';
import { RecruitmentUnprocessableEntityException } from '../exceptions';

export const CommentSchema = z.string();
export class Comment extends ValueObject<string, string> {
  static from(value: string): Comment {
    return new Comment(value);
  }
  validate(value: string): string {
    try {
      return CommentSchema.parse(value);
    } catch (error) {
      throw new RecruitmentUnprocessableEntityException(`Comment : : ${error}`);
    }
  }
}
