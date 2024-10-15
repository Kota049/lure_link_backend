import dayjs from 'src/lib/dayjs';
import { RecruitmentCreatedEvent } from './events/recruitment-created-event';
import { RecruitmentAggregate } from './recruitment';
import {
  Address,
  Budget,
  Description,
  EndDateTime,
  MaxParticipant,
  Place,
  Prefecture,
  StartDateTime,
  UserId,
  RecruitmentId,
  ApplyingId,
} from './value-objects';
import { RecruitmentUnprocessableEntityException } from './exceptions';
import { ApplyingEndDateTime } from './value-objects/applying-end-date-time';
import { ApprovedApplyingEvent } from './events/apploved-applying.event';

describe('Recruitment', () => {
  let validProps: Omit<RecruitmentCreatedEvent, 'recruitmentId'>;
  beforeEach(() => {
    validProps = {
      ownerId: '01JA071A96K19YQJVKV5FDBW6X',
      destination: {
        prefecture: '神奈川県',
        address: '茅ヶ崎市1-13-31',
        description: '江ノ島です',
      },
      depature: {
        prefecture: '埼玉県',
        address: '川越市1-24-14',
        description: 'ファミリーマート〇〇店前です',
      },
      endDate: dayjs('2024-10-11').toISOString(),
      startDate: dayjs('2024-10-10').toISOString(),
      applyingEndDateTime: dayjs('2024-10-09').toISOString(),
      maxParticipant: 2,
      budget: 1000,
      description: 'サーフフィッシングです。ウェーダー持参でお願いします',
      created_at: dayjs('2024-10-01').toISOString(),
    };
  });
  describe('create', () => {
    describe('valid', () => {
      it('created', () => {
        const actual = RecruitmentAggregate.create(validProps);
        expect(actual.recruitmentId).toEqual(expect.any(RecruitmentId));
        expect(actual.ownerId).toEqual(UserId.from(validProps.ownerId));
        expect(actual.destination).toEqual(
          new Place({
            prefecture: Prefecture.from(validProps.destination.prefecture),
            address: Address.from(validProps.destination.address),
            description: Description.from(validProps.destination.description),
          }),
        );
        expect(actual.depature).toEqual(
          new Place({
            prefecture: Prefecture.from(validProps.depature.prefecture),
            address: Address.from(validProps.depature.address),
            description: Description.from(validProps.depature.description),
          }),
        );
        expect(actual.startDateTime).toEqual(
          StartDateTime.from(dayjs(validProps.startDate).toDate()),
        );
        expect(actual.endDateTime).toEqual(
          EndDateTime.from(dayjs(validProps.endDate).toDate()),
        );
        expect(actual.budget).toEqual(Budget.from(validProps.budget));
        expect(actual.maxParticipant).toEqual(
          MaxParticipant.from(validProps.maxParticipant),
        );
        expect(actual.description).toEqual(
          Description.from(validProps.description),
        );
        expect(actual.applyingEndDateTime).toEqual(
          new ApplyingEndDateTime(
            dayjs(validProps.applyingEndDateTime).toDate(),
          ),
        );
      });
    });
    describe('invalid', () => {
      it('start_date is faster than created_at', () => {
        validProps.created_at = dayjs('2024-10-11').toISOString();
        expect(() => RecruitmentAggregate.create(validProps)).toThrow(
          RecruitmentUnprocessableEntityException,
        );
      });
      it('start_date is after than end_date', () => {
        validProps.startDate = dayjs('2024-10-12').toISOString();
        expect(() => RecruitmentAggregate.create(validProps)).toThrow(
          RecruitmentUnprocessableEntityException,
        );
      });
      it('applying_end_date is after than start_date', () => {
        validProps.applyingEndDateTime = dayjs('2024-10-11').toISOString();
        expect(() => RecruitmentAggregate.create(validProps)).toThrow(
          RecruitmentUnprocessableEntityException,
        );
      });
      it('applying_end_date is bedore than created_at', () => {
        validProps.created_at = dayjs('2024-09-10').toISOString();
        validProps.applyingEndDateTime = dayjs('2024-09-09').toISOString();
        expect(() => RecruitmentAggregate.create(validProps)).toThrow(
          RecruitmentUnprocessableEntityException,
        );
      });
    });
  });
  describe('apploveApplying', () => {
    let props: ApprovedApplyingEvent;
    beforeEach(() => {
      props = {
        applyingId: ApplyingId.generate().value,
        recruitmentId: 'not implemnt',
      };
    });
    describe('valid', () => {
      it('register applying', () => {
        const aggregate = RecruitmentAggregate.create(validProps);
        props.recruitmentId = aggregate.recruitmentId.value;
        aggregate.apploveApplying(props);
        expect(aggregate.determinedApplying).toEqual([
          ApplyingId.from(props.applyingId),
        ]);
      });
    });
  });
  describe('canApprovedDuaring', () => {
    it('before applying end-date-time, return true', () => {
      const aggregate = RecruitmentAggregate.create(validProps);
      const now = dayjs('2024-10-09').toISOString();
      const actual = aggregate.canApprovedDuaring(now);
      expect(actual).toBeTruthy();
    });
    it('申し込み締め切り-釣行開始日までの期間が2未満の場合、申し込み終了後はfalseになる', () => {
      const aggregate = RecruitmentAggregate.create(validProps);
      const now = dayjs('2024-10-09 01:00:00').toISOString();
      const actual = aggregate.canApprovedDuaring(now);
      expect(actual).toBeFalsy();
    });
    it('申し込み締め切り-釣行開始日までの期間が2日以上の場合、申し込み終了から1日の間はtrueになる', () => {
      const aggregate = RecruitmentAggregate.create(validProps);
      aggregate.applyingEndDateTime = ApplyingEndDateTime.from(
        dayjs('2024-09-10').toDate(),
      );
      aggregate.startDateTime = StartDateTime.from(
        dayjs('2024-09-11').toDate(),
      );
      const now = dayjs('2024-09-11').toISOString();
      const actual = aggregate.canApprovedDuaring(now);
      expect(actual).toBeTruthy();
    });
  });
});
