import { AggregateRoot } from '@nestjs/cqrs';
import {
  Address,
  ApplyingId,
  Description,
  Place,
  Prefecture,
  RecruitmentId,
  UserId,
} from 'src/v2/recruitment/domain/value-objects';
import {
  DeterminedPickUpDateTime,
  DeterminedPickUpOptionNumber,
  IsDetermined,
} from './value-objects';
import { ApplyingCreatedEvent } from './events/applying-created.event';
import { ApplyingUnprocessableEntityException } from './exceptions';

export class ApplyingAggregate extends AggregateRoot {
  applyingId: ApplyingId;
  recruitmentId: RecruitmentId;
  userId: UserId;
  firstPickUpOption: Place;
  secondPickUpOption?: Place = undefined;
  thirdPickUpOption?: Place = undefined;
  isDetermined: IsDetermined;
  determinedPickUpOptionNumber?: DeterminedPickUpOptionNumber = undefined;
  determinedPickUpDateTime?: DeterminedPickUpDateTime = undefined;
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
    if (
      props.secondPickUpOption === undefined &&
      props.thirdPickUpOption !== undefined
    ) {
      throw new ApplyingUnprocessableEntityException(
        '集合場所の第２候補が指定されていないの場合に、第３が指定されています',
      );
    }
    const applyingId = ApplyingId.generate().value;
    const aggregate = new ApplyingAggregate(applyingId);
    const event = new ApplyingCreatedEvent({
      applyingId,
      ...props,
    });
    aggregate.apply(event);
    return aggregate;
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

  private onApplyingCreatedEvent(event: ApplyingCreatedEvent): void {
    this.applyingId = ApplyingId.from(event.applyingId);
    this.recruitmentId = RecruitmentId.from(event.recruitmentId);
    this.userId = UserId.from(event.userId);
    this.firstPickUpOption = new Place({
      prefecture: Prefecture.from(event.firstPickUpOption.prefecture),
      address: Address.from(event.firstPickUpOption.address),
      description: Description.from(event.firstPickUpOption.description),
    });
    if (event.secondPickUpOption !== undefined) {
      this.secondPickUpOption = new Place({
        prefecture: Prefecture.from(event.secondPickUpOption.prefecture),
        address: Address.from(event.secondPickUpOption.address),
        description: Description.from(event.secondPickUpOption.description),
      });
    }
    if (event.thirdPickUpOption !== undefined) {
      this.thirdPickUpOption = new Place({
        prefecture: Prefecture.from(event.thirdPickUpOption.prefecture),
        address: Address.from(event.thirdPickUpOption.address),
        description: Description.from(event.thirdPickUpOption.description),
      });
    }
    this.isDetermined = IsDetermined.from(false);
  }
}
