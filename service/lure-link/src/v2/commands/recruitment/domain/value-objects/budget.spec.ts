import { Budget } from './budget';

describe('Budget', () => {
  describe('from', () => {
    it('get 0 to Budget ', () => {
      const input = 0;
      const res = Budget.from(input);
      expect(res.value).toEqual(input);
    });
    it('get 50,000 to Budget', () => {
      const input = 50000;
      const res = Budget.from(input);
      expect(res.value).toEqual(input);
    });
  });
  describe('validate', () => {
    it('-1 occurs error', () => {
      const input = -1;
      expect(() => {
        Budget.from(input);
      }).toThrow(Error);
    });
    it('50001 occurs error', () => {
      const input = 50001;
      expect(() => {
        Budget.from(input);
      }).toThrow(Error);
    });
  });
});
