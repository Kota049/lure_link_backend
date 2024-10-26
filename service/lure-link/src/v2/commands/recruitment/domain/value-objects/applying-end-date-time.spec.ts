import dayjs from 'src/lib/dayjs';
import { ApplyingEndDateTime } from './applying-end-date-time';

describe('ApplyingEndDateTime', () => {
  describe('from', () => {
    it('get Date to ApplyingEndDateTime', () => {
      const input = new Date();
      const res = ApplyingEndDateTime.from(input);
      expect(res.value).toEqual(dayjs(input).toISOString());
    });
  });
});
