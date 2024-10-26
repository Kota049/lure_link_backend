import { Test } from '@nestjs/testing';

import { createMock } from '@golevelup/ts-jest';
import dayjs from 'src/lib/dayjs';
import { ApplyingAggregate } from '../../domain/applying';
import {
  APPLYING_REPOSITORY_TOKEN,
  IApplyingRepository,
} from '../../domain/applying.repository';
import { DetermineApplyingCommandHandler } from './determine-applying.command';

describe('DetermineApplyingCommnadHandler', () => {
  let validCommand;
  let commandHandler: DetermineApplyingCommandHandler;
  const mock = createMock<IApplyingRepository>();
  const validAggregate = ApplyingAggregate.create({
    recruitmentId: '01JA071A96K19YQJVKV5FDBW6Y',
    userId: '01JA071A96K19YQJVKV5FDBW6X',
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
      prefecture: '埼玉県',
      address: '川越市1-24-14',
      description: 'ファミリーマート〇〇店前です',
    },
    currentDate: dayjs('2024-10-10').toISOString(),
  });
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: APPLYING_REPOSITORY_TOKEN,
          useValue: mock,
        },
        DetermineApplyingCommandHandler,
      ],
    }).compile();
    commandHandler = module.get<DetermineApplyingCommandHandler>(
      DetermineApplyingCommandHandler,
    );
    mock.save.mockResolvedValue();
    mock.getById.mockResolvedValue(validAggregate);
    validCommand = {
      recruitmentId: '01JA071A96K19YQJVKV5FDBW6X',
      applyingId: '01JA071A96K19YQJVKV5FDBW6X',
      selectPickUpOptionNumber: 1,
      selectPickUpDateTime: dayjs('2080-10-10').toISOString(),
    };
  });

  describe('valid repository', () => {
    it('valid case', async () => {
      const actual = await commandHandler.execute(validCommand);
      expect(actual).toEqual(validAggregate.applyingId.value);
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
