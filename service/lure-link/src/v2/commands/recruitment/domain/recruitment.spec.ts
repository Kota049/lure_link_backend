import dayjs from 'src/lib/dayjs';
import { RecruitmentCreatedEvent } from './events/recruitment-created-event';
import { RecruitmentAggregate } from './recruitment';
import {
  Budget,
  Description,
  EndDateTime,
  MaxParticipant,
  Place,
  StartDateTime,
  UserId,
  RecruitmentId,
  ApplyingId,
  Latitude,
} from './value-objects';
import { RecruitmentUnprocessableEntityException } from './exceptions';
import { ApplyingEndDateTime } from './value-objects/applying-end-date-time';
import { ApprovedApplyingEvent } from './events/apploved-applying.event';
import { Longitude } from './value-objects/place-parts/longitude';

describe('Recruitment', () => {
  let validProps: Omit<RecruitmentCreatedEvent, 'recruitmentId'>;
  beforeEach(() => {
    validProps = {
      ownerId: 'c82a7874-0f49-4447-b10f-61caaa033c58',
      destination: {
        latitude: '神奈川県',
        longitude: '茅ヶ崎市1-13-31',
        description: '江ノ島です',
      },
      depature: {
        latitude: '埼玉県',
        longitude: '川越市1-24-14',
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
            lattitude: Latitude.from(validProps.destination.latitude),
            longitude: Longitude.from(validProps.destination.longitude),
            description: Description.from(validProps.destination.description),
          }),
        );
        expect(actual.depature).toEqual(
          new Place({
            lattitude: Latitude.from(validProps.depature.latitude),
            longitude: Longitude.from(validProps.depature.longitude),
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
        currentDate: dayjs('2024-10-08').toISOString(),
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
    describe('invalid', () => {
      it('invalid duaring, throw error', () => {
        const aggregate = RecruitmentAggregate.create(validProps);
        props.recruitmentId = aggregate.recruitmentId.value;
        props.currentDate = dayjs('2024-10-09 01:00:00').toISOString();
        expect(() => aggregate.apploveApplying(props)).toThrow(Error);
      });
      it('already approved applying, throw error', () => {
        const aggregate = RecruitmentAggregate.create(validProps);
        props.recruitmentId = aggregate.recruitmentId.value;
        aggregate.determinedApplying = [ApplyingId.from(props.applyingId)];
        expect(() => aggregate.apploveApplying(props)).toThrow(Error);
      });
      it('is over max participant,throw error ', () => {
        const aggregate = RecruitmentAggregate.create(validProps);
        props.recruitmentId = aggregate.recruitmentId.value;
        aggregate.maxParticipant = MaxParticipant.from(1);
        aggregate.determinedApplying = [ApplyingId.generate()];
        expect(() => aggregate.apploveApplying(props)).toThrow(Error);
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
        dayjs('2024-09-14').toDate(),
      );
      const now = dayjs('2024-09-10 23:59:59').toISOString();
      const actual = aggregate.canApprovedDuaring(now);
      expect(actual).toBeTruthy();
    });
    it('申し込み締め切り-釣行開始日までの期間が2日以上の場合、申し込み終了から1日以降はfalseになる', () => {
      const aggregate = RecruitmentAggregate.create(validProps);
      aggregate.applyingEndDateTime = ApplyingEndDateTime.from(
        dayjs('2024-09-10').toDate(),
      );
      aggregate.startDateTime = StartDateTime.from(
        dayjs('2024-09-14').toDate(),
      );
      const now = dayjs('2024-09-11 01:00:00').toISOString();
      const actual = aggregate.canApprovedDuaring(now);
      expect(actual).toBeFalsy();
    });
  });
});
