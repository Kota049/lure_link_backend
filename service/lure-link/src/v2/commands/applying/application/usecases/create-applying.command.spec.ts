import { Test } from '@nestjs/testing';

import { createMock } from '@golevelup/ts-jest';
import { CreateApplyingCommandHandler } from './create-applying.command';
import {
  APPLYING_REPOSITORY_TOKEN,
  IApplyingRepository,
} from '../../domain/applying.repository';

describe('CreateApplyingCommnadHandler', () => {
  let validCommand;
  let commandHandler: CreateApplyingCommandHandler;
  const mock = createMock<IApplyingRepository>();
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: APPLYING_REPOSITORY_TOKEN,
          useValue: mock,
        },
        CreateApplyingCommandHandler,
      ],
    }).compile();
    commandHandler = module.get<CreateApplyingCommandHandler>(
      CreateApplyingCommandHandler,
    );
    mock.save.mockResolvedValue();
    validCommand = {
      recruitmentId: '01JA071A96K19YQJVKV5FDBW6Y',
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
        latitude: '埼玉県',
        longitude: '川越市1-24-14',
        description: 'ファミリーマート〇〇店前です',
      },
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
