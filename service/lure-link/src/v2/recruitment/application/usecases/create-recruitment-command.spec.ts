import { Test } from '@nestjs/testing';
import {
  IRecruitmentRepository,
  RECRUITMENT_REPOSITORY_TOKEN,
} from '../../domain/recruitment.repository.interface';
import { createMock } from '@golevelup/ts-jest';
import dayjs from 'src/lib/dayjs';
import { CreateRecruitmentCommandHandler } from './create-recruitment-command';
import { CommandHandler } from '@nestjs/cqrs';

describe('CreateRecruitmentCommnadHandler', () => {
  let validCommand;
  let commandHandler: CreateRecruitmentCommandHandler;
  const mock = createMock<IRecruitmentRepository>();
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: RECRUITMENT_REPOSITORY_TOKEN,
          useValue: mock,
        },
        CreateRecruitmentCommandHandler,
      ],
    }).compile();
    commandHandler = module.get<CreateRecruitmentCommandHandler>(
      CreateRecruitmentCommandHandler,
    );
    mock.save.mockResolvedValue();
    validCommand = {
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
      endDate: dayjs('2080-10-11').toISOString(),
      startDate: dayjs('2080-10-10').toISOString(),
      applyingEndDateTime: dayjs('2080-10-09').toISOString(),
      maxParticipant: 2,
      budget: 1000,
      description: 'サーフフィッシングです。ウェーダー持参でお願いします',
    };
  });

  describe('valid repository', () => {
    it('valid case', async () => {
      const actual = await commandHandler.execute(validCommand);
      expect(actual).toEqual(expect.any(String));
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
  });
});
