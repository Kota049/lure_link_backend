import { CommandBus } from '@nestjs/cqrs';
import { TestingModule, Test } from '@nestjs/testing';
import { LinkApplyingToRecruitmentEventHandler } from './link-applying-to-recruitment.event.handler';
import { createMock } from '@golevelup/ts-jest';
import dayjs from 'src/lib/dayjs';

describe('ApplyingDeterminedEvent', () => {
  const commandBus = createMock<CommandBus>();
  let suit: LinkApplyingToRecruitmentEventHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CommandBus,
          useValue: commandBus,
        },
        LinkApplyingToRecruitmentEventHandler,
      ],
    }).compile();
    suit = module.get(LinkApplyingToRecruitmentEventHandler);
    commandBus.execute.mockResolvedValue('id');
  });
  const event = {
    applyingId: 'not implement',
    recruitmentId: '01JA071A96K19YQJVKV5FDBW6X',
    selectPickUpOptionNumber: 1,
    selectPickUpDateTime: dayjs('2024-10-20').toISOString(),
    currentDate: dayjs('2024-10-02').toISOString(),
  };
  it('valida case', async () => {
    await expect(suit.handle(event)).resolves.not.toThrow();
  });
  it('occurs error if commandBus occurs error', async () => {
    const exepectedErr = new Error('Ut');
    commandBus.execute.mockReset();
    commandBus.execute.mockRejectedValue(exepectedErr);
    await expect(suit.handle(event)).rejects.toThrow(exepectedErr);
  });
});
