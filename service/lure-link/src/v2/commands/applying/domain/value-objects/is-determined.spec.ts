import { IsDetermined } from './is-determined';

describe('IsDetermined', () => {
  describe('from', () => {
    it('valid case', () => {
      const input = true;
      const res = IsDetermined.from(input);
      expect(res.value).toEqual(input);
    });
    it('not boolean input occurs error', () => {
      const input = '' as never;
      expect(() => {
        IsDetermined.from(input);
      }).toThrow(Error);
    });
  });
});
