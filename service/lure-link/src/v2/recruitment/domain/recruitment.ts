import { AggregateRoot } from '@nestjs/cqrs';
import { RecruitmentCreatedEvent } from './events/recruitment-created-event';
import { RecruitmentUpdatedEvent } from './events/recruitment-updated-event';
import {
  Address,
  ApplyingId,
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
import { RecruitmentUnprocessableEntityException } from './exceptions';
import { INVALID_END_DATE, INVALID_APPLYING_END_DATE } from 'common';
import { ApplyingEndDateTime } from './value-objects/applying-end-date-time';
import { ApprovedApplyingEvent } from './events/apploved-applying.event';

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
  applyingEndDateTime: ApplyingEndDateTime;
  determinedApplying: ApplyingId[] = [];
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
    const applyingEndDateTimeDayJs = dayjs(props.applyingEndDateTime);
    /**
     * 適切な時間の並び
     * 募集作成時 < 申し込み期限 < 釣行開始日 < 釣行終了日
     */
    if (createdAtDayJs.isAfter(applyingEndDateTimeDayJs)) {
      throw new RecruitmentUnprocessableEntityException(
        INVALID_APPLYING_END_DATE,
      );
    }
    if (applyingEndDateTimeDayJs.isAfter(startDateDayJs)) {
      throw new RecruitmentUnprocessableEntityException(
        INVALID_APPLYING_END_DATE,
      );
    }
    if (startDateDayJs.isAfter(endDateDayJs)) {
      throw new RecruitmentUnprocessableEntityException(INVALID_END_DATE);
    }
  }

  apploveApplying(props: ApprovedApplyingEvent) {
    const event = new ApprovedApplyingEvent(props);
    this.apply(event);
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
    this.applyingEndDateTime = ApplyingEndDateTime.from(
      dayjs(event.applyingEndDateTime).toDate(),
    );
    this.maxParticipant = MaxParticipant.from(event.maxParticipant);
    this.budget = Budget.from(event.budget);
    this.description = Description.from(event.description);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRecruitmentUpdatedEvent(event: RecruitmentUpdatedEvent) {
    // this.name = 'updated';
  }

  onApprovedApplyingEvent(event: ApprovedApplyingEvent) {
    this.determinedApplying.push(ApplyingId.from(event.applyingId));
  }

  canApprovedDuaring(date: string): boolean {
    /**
     * 仕様メモ
     * 承認可能期間
     * - 申し込み締め切り前
     * - 申し込み締め切り-釣行開始日までの期間が2日以上ある場合→申し込み締め切り日から1日
     * - 申し込み締め切り-釣行開始日までの期間が2未満の場合→申し込み締め切り
     */
    const applyingEndDate = dayjs(this.applyingEndDateTime.value);
    const current = dayjs(date);
    const startDate = dayjs(this.startDateTime.value);
    if (startDate.diff(applyingEndDate, 'days') >= 2) {
      return true;
    }
    if (current.isAfter(applyingEndDate)) {
      return false;
    }
    return true;
  }
}
