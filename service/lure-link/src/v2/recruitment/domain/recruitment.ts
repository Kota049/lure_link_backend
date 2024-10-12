import { AggregateRoot } from '@nestjs/cqrs';
import { RecruitmentCreatedEvent } from './events/recruitment-created-event';
import { RecruitmentUpdatedEvent } from './events/recruitment-updated-event';
import {
  ApplicationId,
  Budget,
  Description,
  EndDateTime,
  MaxParticipant,
  Place,
  RecruitmentId,
  StartDateTime,
  UserId,
} from './value-objects';

export class RecruitmentAggregate extends AggregateRoot {
  recruitmentId: RecruitmentId;
  ownerId: UserId;
  destination: Place;
  depature: Place;
  startDateTime: StartDateTime;
  endDateTime: EndDateTime;
  maxParticipant: MaxParticipant;
  budget: Budget;
  description: Description;
  constructor(id: string) {
    super();
    this.recruitmentId = RecruitmentId.from(id);
  }
  getStreamId(): string {
    return `Recruitment-${this.recruitmentId.value}`;
  }

  static create(
    event: Omit<RecruitmentCreatedEvent, 'recruitmentId'>,
  ): RecruitmentAggregate {
    // 作成
    // 基本的に全部受け取って、全部埋める
    throw new Error('not implement');
  }

  apploveApplying(event: any) {
    // UC
    // 応募集約で集合場所を指定して、承認する
    // 応募のIDをここに登録する
  }
  cancelRecruitment(event: any) {
    // キャンセルする
    // ロジック
    // 出発時刻から1h以上経っている場合にはキャンセルはできない
    // キャンセルする場合は理由が必要な方が良さそう
  }
  deleteApplying(event: any) {
    // 応募者がキャンセルする
    // 出発日の3日前まではキャンセル
    // 3日を過ぎた場合は、キャンセルはできるが、料金は帰ってこない
    // 支払いドメインはアプリケーションで呼び出す
  }

  update(event: RecruitmentUpdatedEvent) {
    this.apply(event);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRecruitmentCreatedEvent(event: RecruitmentCreatedEvent) {
    // this.name = 'initial';
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRecruitmentUpdatedEvent(event: RecruitmentUpdatedEvent) {
    // this.name = 'updated';
  }
}
