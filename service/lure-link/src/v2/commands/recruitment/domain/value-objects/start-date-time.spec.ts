import dayjs from 'src/lib/dayjs';
import { StartDateTime } from './start-date-time';

describe('StartDateTime', () => {
  describe('from', () => {
    it('get Date to StartDateTime', () => {
      const input = new Date();
      const res = StartDateTime.from(input);
      expect(res.value).toEqual(dayjs(input).toISOString());
    });
  });
});
