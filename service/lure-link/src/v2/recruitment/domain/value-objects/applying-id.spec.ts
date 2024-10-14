import { ApplyingId } from './applying-id';

describe('ApplicationId', () => {
  describe('generate', () => {
    it('generate one', () => {
      const res = ApplyingId.generate();
      expect(res.value).toEqual(expect.any(String));
    });
  });
  describe('from', () => {
    it('valid case', () => {
      const input = '01AN4Z07BY79KA1307SR9X4MV3';
      const res = ApplyingId.from(input);
      expect(res.value).toEqual(input);
    });
    it('empty occurs error', () => {
      const input = '';
      expect(() => {
        ApplyingId.from(input);
      }).toThrow(Error);
    });
    it('Invalid letter occurs error', () => {
      const input = '🤪N4Z07BY79KA1307SR9X4MV3';
      expect(() => {
        ApplyingId.from(input);
      }).toThrow(Error);
    });
    it('too large length occurs error', () => {
      const input = '01AN4Z07BY79KA1307SR9X4MV3A';
      expect(() => {
        ApplyingId.from(input);
      }).toThrow(Error);
    });
  });
});
