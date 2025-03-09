import { AggregateRoot } from '@nestjs/cqrs';

import {
  DeterminedPickUpDateTime,
  DeterminedPickUpOptionNumber,
  IsDetermined,
} from './value-objects';
import { ApplyingCreatedEvent } from './events/applying-created.event';
import { ApplyingUnprocessableEntityException } from './exceptions';
import {
  ALREADY_DETERMINED_APPLYING,
  INVALID_DETERMINED_PICK_UP_OPTION,
  INVALID_PICK_UP_OPTION_COMBINATION,
} from 'common';
import { ApplyingDeterminedEvent } from './events/applying-determined.event';
import dayjs from 'src/lib/dayjs';
import {
  ApplyingId,
  RecruitmentId,
  UserId,
  Place,
  Description,
  Latitude,
  Longitude,
} from '../../recruitment/domain/value-objects';

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
    this.applyingId = ApplyingId.from(id);
  }
  getStreamId(): string {
    return `Applying-${this.applyingId.value}`;
  }

  static create(
    props: Omit<ApplyingCreatedEvent, 'applyingId'>,
  ): ApplyingAggregate {
    if (
      props.secondPickUpOption === undefined &&
      props.thirdPickUpOption !== undefined
    ) {
      throw new ApplyingUnprocessableEntityException(
        INVALID_PICK_UP_OPTION_COMBINATION,
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

  determinePickUp(props: ApplyingDeterminedEvent): void {
    this.validateDeterminePickUp(props);
    const event = new ApplyingDeterminedEvent(props);
    this.apply(event);
  }

  private validateDeterminePickUp(props: ApplyingDeterminedEvent): void {
    if (this.isDetermined.value === true) {
      throw new ApplyingUnprocessableEntityException(
        ALREADY_DETERMINED_APPLYING,
      );
    }
    if (
      props.selectPickUpOptionNumber === 2 &&
      this.secondPickUpOption === undefined
    ) {
      throw new ApplyingUnprocessableEntityException(
        INVALID_DETERMINED_PICK_UP_OPTION,
      );
    }
    if (
      props.selectPickUpOptionNumber === 3 &&
      this.thirdPickUpOption === undefined
    ) {
      throw new ApplyingUnprocessableEntityException(
        INVALID_DETERMINED_PICK_UP_OPTION,
      );
    }
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
      lattitude: Latitude.from(event.firstPickUpOption.latitude),
      longitude: Longitude.from(event.firstPickUpOption.longitude),
      description: Description.from(event.firstPickUpOption.description),
    });
    if (event.secondPickUpOption !== undefined) {
      this.secondPickUpOption = new Place({
        lattitude: Latitude.from(event.secondPickUpOption.latitude),
        longitude: Longitude.from(event.secondPickUpOption.longitude),
        description: Description.from(event.secondPickUpOption.description),
      });
    }
    if (event.thirdPickUpOption !== undefined) {
      this.thirdPickUpOption = new Place({
        lattitude: Latitude.from(event.thirdPickUpOption.latitude),
        longitude: Longitude.from(event.thirdPickUpOption.longitude),
        description: Description.from(event.thirdPickUpOption.description),
      });
    }
    this.isDetermined = IsDetermined.from(false);
  }

  private onApplyingDeterminedEvent(event: ApplyingDeterminedEvent): void {
    this.isDetermined = IsDetermined.from(true);
    this.determinedPickUpOptionNumber = DeterminedPickUpOptionNumber.from(
      event.selectPickUpOptionNumber,
    );
    this.determinedPickUpDateTime = DeterminedPickUpDateTime.from(
      dayjs(event.selectPickUpDateTime).toDate(),
    );
  }
}
