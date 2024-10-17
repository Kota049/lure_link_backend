import {
  Address,
  ApplyingId,
  Description,
  Place,
  Prefecture,
  RecruitmentId,
  UserId,
} from 'src/v2/recruitment/domain/value-objects';
import { ApplyingAggregate } from './applying';
import { ApplyingCreatedEvent } from './events/applying-created.event';
import { IsDetermined } from './value-objects';
import dayjs from 'src/lib/dayjs';
import { ApplyingUnprocessableEntityException } from './exceptions';

describe('Recruitment', () => {
  let validProps: Omit<ApplyingCreatedEvent, 'applyingId'>;
  beforeEach(() => {
    validProps = {
      recruitmentId: '01JA071A96K19YQJVKV5FDBW6X',
      userId: '01JA071A96K19YQJVKV5FDBW6Y',
      firstPickUpOption: {
        prefecture: '神奈川県',
        address: '茅ヶ崎市1-13-31',
        description: '江ノ島です',
      },
      secondPickUpOption: {
        prefecture: '埼玉県',
        address: '川越市1-24-14',
        description: 'ファミリーマート〇〇店前です',
      },
      thirdPickUpOption: {
        prefecture: '東京都',
        address: '新宿1-2-3',
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
            prefecture: Prefecture.from(
              validProps.firstPickUpOption.prefecture,
            ),
            address: Address.from(validProps.firstPickUpOption.address),
            description: Description.from(
              validProps.firstPickUpOption.description,
            ),
          }),
        );
        expect(actual.secondPickUpOption).toEqual(
          new Place({
            prefecture: Prefecture.from(
              validProps.secondPickUpOption.prefecture,
            ),
            address: Address.from(validProps.secondPickUpOption.address),
            description: Description.from(
              validProps.secondPickUpOption.description,
            ),
          }),
        );
        expect(actual.thirdPickUpOption).toEqual(
          new Place({
            prefecture: Prefecture.from(
              validProps.thirdPickUpOption.prefecture,
            ),
            address: Address.from(validProps.thirdPickUpOption.address),
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
});
