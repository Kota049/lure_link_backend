import {
  ApplyingId,
  Description,
  Latitude,
  Place,
  RecruitmentId,
  UserId,
} from '../../recruitment/domain/value-objects';
import { ApplyingAggregate } from './applying';
import { ApplyingCreatedEvent } from './events/applying-created.event';
import {
  DeterminedPickUpDateTime,
  DeterminedPickUpOptionNumber,
  IsDetermined,
} from './value-objects';
import dayjs from 'src/lib/dayjs';
import { ApplyingUnprocessableEntityException } from './exceptions';
import { ApplyingDeterminedEvent } from './events/applying-determined.event';
import { Longitude } from '../../recruitment/domain/value-objects/place-parts/longitude';

describe('Recruitment', () => {
  let validProps: Omit<ApplyingCreatedEvent, 'applyingId'>;
  beforeEach(() => {
    validProps = {
      recruitmentId: '01JA071A96K19YQJVKV5FDBW6X',
      userId: 'd6a5d94a-823d-4311-ae02-ee2c6569858e',
      firstPickUpOption: {
        latitude: '神奈川県',
        longitude: '茅ヶ崎市1-13-31',
        description: '江ノ島です',
      },
      secondPickUpOption: {
        latitude: '埼玉県',
        longitude: '川越市1-24-14',
        description: 'ファミリーマート〇〇店前です',
      },
      thirdPickUpOption: {
        latitude: '東京都',
        longitude: '新宿1-2-3',
        description: 'ファミリーマート〇〇店前です',
      },
      currentDate: dayjs('2024-10-01').toISOString(),
    };
  });
  describe('create', () => {
    describe('valid', () => {
      it('created', () => {
        const actual = ApplyingAggregate.create(validProps);
        expect(actual.applyingId).toEqual(expect.any(ApplyingId));
        expect(actual.recruitmentId).toEqual(
          RecruitmentId.from(validProps.recruitmentId),
        );
        expect(actual.userId).toEqual(UserId.from(validProps.userId));
        expect(actual.firstPickUpOption).toEqual(
          new Place({
            lattitude: Latitude.from(validProps.firstPickUpOption.latitude),
            longitude: Longitude.from(validProps.firstPickUpOption.longitude),
            description: Description.from(
              validProps.firstPickUpOption.description,
            ),
          }),
        );
        expect(actual.secondPickUpOption).toEqual(
          new Place({
            lattitude: Latitude.from(validProps.secondPickUpOption.latitude),
            longitude: Longitude.from(validProps.secondPickUpOption.longitude),
            description: Description.from(
              validProps.secondPickUpOption.description,
            ),
          }),
        );
        expect(actual.thirdPickUpOption).toEqual(
          new Place({
            lattitude: Latitude.from(validProps.thirdPickUpOption.latitude),
            longitude: Longitude.from(validProps.thirdPickUpOption.longitude),
            description: Description.from(
              validProps.thirdPickUpOption.description,
            ),
          }),
        );
        expect(actual.isDetermined).toEqual(IsDetermined.from(false));
        expect(actual.determinedPickUpOptionNumber).toEqual(undefined);
        expect(actual.determinedPickUpDateTime).toEqual(undefined);
      });
      it('implements undefined when third selete is undefined', () => {
        validProps.thirdPickUpOption = undefined;
        const actual = ApplyingAggregate.create(validProps);
        expect(actual.thirdPickUpOption).toEqual(undefined);
      });
      it('implements undefined when second selete is undefined', () => {
        validProps.thirdPickUpOption = undefined;
        validProps.secondPickUpOption = undefined;
        const actual = ApplyingAggregate.create(validProps);
        expect(actual.secondPickUpOption).toEqual(undefined);
      });
    });
    describe('invalid', () => {
      it('occurs error if second selected and third is not selected', () => {
        validProps.secondPickUpOption = undefined;
        expect(() => ApplyingAggregate.create(validProps)).toThrow(
          ApplyingUnprocessableEntityException,
        );
      });
    });
  });
  describe('determinePickUp', () => {
    let applyingDeterminedProps: ApplyingDeterminedEvent;
    beforeEach(() => {
      applyingDeterminedProps = {
        applyingId: 'not implement',
        recruitmentId: '01JA071A96K19YQJVKV5FDBW6X',
        selectPickUpOptionNumber: 1,
        selectPickUpDateTime: dayjs('2024-10-20').toISOString(),
        currentDate: dayjs('2024-10-02').toISOString(),
      };
    });
    describe('valid', () => {
      it('valid case', () => {
        const aggregate = ApplyingAggregate.create(validProps);
        applyingDeterminedProps.applyingId = aggregate.applyingId.value;
        aggregate.determinePickUp(applyingDeterminedProps);
        expect(aggregate.isDetermined).toEqual(IsDetermined.from(true));
        expect(aggregate.determinedPickUpOptionNumber).toEqual(
          DeterminedPickUpOptionNumber.from(
            applyingDeterminedProps.selectPickUpOptionNumber,
          ),
        );
        expect(aggregate.determinedPickUpDateTime).toEqual(
          DeterminedPickUpDateTime.from(
            dayjs(applyingDeterminedProps.selectPickUpDateTime).toDate(),
          ),
        );
      });
    });
    describe('invalid', () => {
      it('occurs error when selected option2 if option 2 is undefined', () => {
        validProps.secondPickUpOption = undefined;
        validProps.thirdPickUpOption = undefined;
        const aggregate = ApplyingAggregate.create(validProps);
        applyingDeterminedProps.selectPickUpOptionNumber = 2;
        expect(() =>
          aggregate.determinePickUp(applyingDeterminedProps),
        ).toThrow(ApplyingUnprocessableEntityException);
      });
      it('occurs error when selected option3 if option 3 is undefined', () => {
        validProps.secondPickUpOption = undefined;
        validProps.thirdPickUpOption = undefined;
        const aggregate = ApplyingAggregate.create(validProps);
        applyingDeterminedProps.selectPickUpOptionNumber = 3;
        expect(() =>
          aggregate.determinePickUp(applyingDeterminedProps),
        ).toThrow(ApplyingUnprocessableEntityException);
      });
      it('occurs error if already determined', () => {
        const aggregate = ApplyingAggregate.create(validProps);
        aggregate.isDetermined = IsDetermined.from(true);
        expect(() =>
          aggregate.determinePickUp(applyingDeterminedProps),
        ).toThrow(ApplyingUnprocessableEntityException);
      });
    });
  });
});
