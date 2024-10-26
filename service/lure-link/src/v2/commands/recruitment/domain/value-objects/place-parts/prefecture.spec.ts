import { Prefecture } from './prefecture';

describe('Prefecture', () => {
  describe('from', () => {
    it('valid input', () => {
      const input = '埼玉県';
      const res = Prefecture.from(input);
      expect(res.value).toEqual(input);
    });
    it('another valid prefecture', () => {
      const input = '東京都';
      const res = Prefecture.from(input);
      expect(res.value).toEqual(input);
    });
  });
  describe('validate', () => {
    it('empty string occurs error', () => {
      const input = '';
      expect(() => {
        Prefecture.from(input);
      }).toThrow(Error);
    });
    it('without attribute occurs error', () => {
      const input = '埼玉';
      expect(() => {
        Prefecture.from(input);
      }).toThrow(Error);
    });
  });
});
