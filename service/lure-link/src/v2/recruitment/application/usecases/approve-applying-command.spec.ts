import { Test } from '@nestjs/testing';
import {
  IRecruitmentRepository,
  RECRUITMENT_REPOSITORY_TOKEN,
} from '../../domain/recruitment.repository.interface';
import { createMock } from '@golevelup/ts-jest';
import dayjs from 'src/lib/dayjs';
import { ApproveAppyingCommandHandler } from './approve-applying.command';
import { RecruitmentAggregate } from '../../domain/recruitment';

describe('ApproveAppyingCommnadHandler', () => {
  let validCommand;
  let commandHandler: ApproveAppyingCommandHandler;
  const mock = createMock<IRecruitmentRepository>();
  const validAggregate = RecruitmentAggregate.create({
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
  });
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: RECRUITMENT_REPOSITORY_TOKEN,
          useValue: mock,
        },
        ApproveAppyingCommandHandler,
      ],
    }).compile();
    commandHandler = module.get<ApproveAppyingCommandHandler>(
      ApproveAppyingCommandHandler,
    );
    mock.save.mockResolvedValue();
    mock.getById.mockResolvedValue(validAggregate);
    validCommand = {
      recruitmentId: '01JA071A96K19YQJVKV5FDBW6X',
      applyingId: '01JA071A96K19YQJVKV5FDBW6X',
    };
  });

  describe('valid repository', () => {
    it('valid case', async () => {
      const actual = await commandHandler.execute(validCommand);
      expect(actual).toEqual(validAggregate.recruitmentId.value);
    });
  });
  describe('invalid repostory', () => {
    it('occurs error if save failed', async () => {
      const expectedErr = new Error('UT');
      mock.save.mockReset();
      mock.save.mockRejectedValue(expectedErr);
      await expect(async () =>
        commandHandler.execute(validCommand),
      ).rejects.toThrow(Error);
    });
    it('occurs error if repository failed', async () => {
      const expectedErr = new Error('UT');
      mock.getById.mockReset();
      mock.getById.mockRejectedValue(expectedErr);
      await expect(async () =>
        commandHandler.execute(validCommand),
      ).rejects.toThrow(Error);
    });
  });
});
