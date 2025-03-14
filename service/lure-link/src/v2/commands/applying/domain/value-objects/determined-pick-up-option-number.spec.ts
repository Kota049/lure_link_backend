import { DeterminedPickUpOptionNumber } from './determined-pick-up-option-number';

describe('determinedPickUpOptionNumber', () => {
  describe('from', () => {
    it('valid case', () => {
      const input = 1;
      const res = DeterminedPickUpOptionNumber.from(input);
      expect(res.value).toEqual(input);
    });
    it('not number input occurs error', () => {
      const input = '' as never;
      expect(() => {
        DeterminedPickUpOptionNumber.from(input);
      }).toThrow(Error);
    });
    it('0 occurs error', () => {
      const input = 0;
      expect(() => {
        DeterminedPickUpOptionNumber.from(input);
      }).toThrow(Error);
    });
    it('4 occurs error', () => {
      const input = 4;
      expect(() => {
        DeterminedPickUpOptionNumber.from(input);
      }).toThrow(Error);
    });
    it('1.5 occurs error', () => {
      const input = 1.5;
      expect(() => {
        DeterminedPickUpOptionNumber.from(input);
      }).toThrow(Error);
    });
  });
});
