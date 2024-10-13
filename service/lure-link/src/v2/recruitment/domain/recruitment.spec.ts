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
} from './value-objects';

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
      maxParticipant: 2,
      budget: 1000,
      description: 'サーフフィッシングです。ウェーダー持参でお願いします',
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
      });
    });
  });
});
