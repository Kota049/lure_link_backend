import { Address } from './address';

describe('Address', () => {
  describe('from', () => {
    it('valid input', () => {
      const input = '川越市元町1丁目3番地1';
      const res = Address.from(input);
      expect(res.value).toEqual(input);
    });
  });
  describe('validate', () => {
    it('空文字でエラー', () => {
      const input = '';
      expect(() => {
        Address.from(input);
      }).toThrow(Error);
    });
  });
});
