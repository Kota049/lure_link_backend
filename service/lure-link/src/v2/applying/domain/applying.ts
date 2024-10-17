import { AggregateRoot } from '@nestjs/cqrs';
import {
  ApplyingId,
  Place,
  RecruitmentId,
  UserId,
} from 'src/v2/recruitment/domain/value-objects';
import {
  DeterminedPickUpDateTime,
  DeterminedPickUpOptionNumber,
  IsDetermined,
} from './value-objects';
import { ApplyingCreatedEvent } from './events/applying-created.event';

export class ApplyingAggregate extends AggregateRoot {
  applyingId: ApplyingId;
  recruitmentId: RecruitmentId;
  userId: UserId;
  firstPickUpOption: Place;
  secondPickUpOption: Place | undefined;
  thirdPickUpOption: Place | undefined;
  isDetermined: IsDetermined;
  determinedPickUpOptionNumber: DeterminedPickUpOptionNumber | undefined;
  determinedPickUpDateTime: DeterminedPickUpDateTime | undefined;
  constructor(id: string) {
    super();
    this.recruitmentId = ApplyingId.from(id);
  }
  getStreamId(): string {
    return `Recruitment-${this.recruitmentId.value}`;
  }

  static create(
    props: Omit<ApplyingCreatedEvent, 'applyingId'>,
  ): ApplyingAggregate {
    // 作成
    // 基本的に全部受け取って、全部埋める
    // this.apply(props);
    throw new Error('');
  }

  cancel(event: any) {
    // キャンセルする
    // キャンセルしたときに、支払いをどうするか決める
  }

  determinePickUp(event: any) {
    // ピックアップ場所と時間を指定して、ステータスを決定する
  }

  restitute(event: any) {
    // 返金する
  }
  fix(event: any) {
    // 金額を確定する
  }
}
