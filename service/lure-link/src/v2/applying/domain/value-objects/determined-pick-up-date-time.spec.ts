import dayjs from 'src/lib/dayjs';
import { DeterminedPickUpDateTime } from './determined-pick-up-date-time';

describe('PickUpDateTime', () => {
  describe('from', () => {
    it('get Date to PickUpDateTime', () => {
      const input = new Date();
      const res = DeterminedPickUpDateTime.from(input);
      expect(res.value).toEqual(dayjs(input).toISOString());
    });
  });
});
