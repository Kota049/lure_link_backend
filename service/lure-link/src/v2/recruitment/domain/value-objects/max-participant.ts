import { ValueObject } from '../../../common/value-object.interface';
import { z } from 'zod';
import { RecruitmentUnprocessableEntityException } from '../exceptions';

export const MaxParticipantSchema = z.number().min(1).max(10);

export class MaxParticipant extends ValueObject<number, number> {
  validate(value: number): number {
    try {
      return MaxParticipantSchema.parse(value);
    } catch (error) {
      throw new RecruitmentUnprocessableEntityException(
        `MaxParticipant : : ${error}`,
      );
    }
  }
  static from(value: number): MaxParticipant {
    return new MaxParticipant(value);
  }
}
