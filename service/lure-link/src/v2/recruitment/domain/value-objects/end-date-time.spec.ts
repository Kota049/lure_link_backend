import dayjs from 'src/lib/dayjs';
import { EndDateTime } from './end-date-time';

describe('EndDateTime', () => {
  describe('from', () => {
    it('get Date to EndDateTime', () => {
      const input = new Date();
      const res = EndDateTime.from(input);
      expect(res.value).toEqual(dayjs(input).toISOString());
    });
  });
});
