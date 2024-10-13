import { AggregateRoot } from '@nestjs/cqrs';
import { RecruitmentCreatedEvent } from './events/recruitment-created-event';
import { RecruitmentUpdatedEvent } from './events/recruitment-updated-event';
import {
  Address,
  Budget,
  Description,
  EndDateTime,
  MaxParticipant,
  Place,
  Prefecture,
  RecruitmentId,
  StartDateTime,
  UserId,
} from './value-objects';
import dayjs from 'src/lib/dayjs';

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
    props: Omit<RecruitmentCreatedEvent, 'recruitmentId'>,
  ): RecruitmentAggregate {
    // 作成
    const recruitmentId = RecruitmentId.generate().value;
    const aggregate = new RecruitmentAggregate(recruitmentId);
    RecruitmentAggregate.validateCreating(props);
    const event = new RecruitmentCreatedEvent({
      recruitmentId,
      ...props,
    });
    aggregate.apply(event);
    return aggregate;
  }

  private static validateCreating(
    props: Omit<RecruitmentCreatedEvent, 'recruitmentId'>,
  ) {
    const startDateDayJs = dayjs(props.startDate);
    const createdAtDayJs = dayjs(props.created_at);
    const endDateDayJs = dayjs(props.endDate);
    if (startDateDayJs.isBefore(createdAtDayJs)) {
      throw new Error('釣行開始日が過去の日付です');
    }
    if (startDateDayJs.isAfter(endDateDayJs)) {
      throw new Error('釣行終了日が釣行開始日よりも前の日付です');
    }
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
    this.ownerId = UserId.from(event.ownerId);
    this.destination = new Place({
      prefecture: Prefecture.from(event.destination.prefecture),
      address: Address.from(event.destination.address),
      description: Description.from(event.destination.description),
    });
    this.depature = new Place({
      prefecture: Prefecture.from(event.depature.prefecture),
      address: Address.from(event.depature.address),
      description: Description.from(event.depature.description),
    });
    this.startDateTime = StartDateTime.from(dayjs(event.startDate).toDate());
    this.endDateTime = EndDateTime.from(dayjs(event.endDate).toDate());
    this.maxParticipant = MaxParticipant.from(event.maxParticipant);
    this.budget = Budget.from(event.budget);
    this.description = Description.from(event.description);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRecruitmentUpdatedEvent(event: RecruitmentUpdatedEvent) {
    // this.name = 'updated';
  }
}
