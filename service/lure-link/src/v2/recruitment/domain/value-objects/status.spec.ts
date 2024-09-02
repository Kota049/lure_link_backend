import { Status, StatusValue } from './status';

describe('Status', () => {
  describe('from', () => {
    it('get APPLYING to Status ', () => {
      const input = StatusValue.APPLYING;
      const res = Status.from(input);
      expect(res.value).toEqual(input);
    });
    it('get FIXED to Status ', () => {
      const input = StatusValue.FIXED;
      const res = Status.from(input);
      expect(res.value).toEqual(input);
    });
    it('get CANCEL to Status ', () => {
      const input = StatusValue.CANCEL;
      const res = Status.from(input);
      expect(res.value).toEqual(input);
    });
    it('get FINISHED to Status ', () => {
      const input = StatusValue.FINISHED;
      const res = Status.from(input);
      expect(res.value).toEqual(input);
    });
  });
  describe('validate', () => {
    it('-1 occurs error', () => {
      const input = -1;
      expect(() => {
        Status.from(input);
      }).toThrow(Error);
    });
    it('4 occurs error', () => {
      const input = 4;
      expect(() => {
        Status.from(input);
      }).toThrow(Error);
    });
  });
});
