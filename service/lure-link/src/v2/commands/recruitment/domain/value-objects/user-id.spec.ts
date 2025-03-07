import { UserId } from './user-id';

describe('UserId', () => {
  describe('generate', () => {
    it('generate one', () => {
      const res = UserId.generate();
      expect(res.value).toEqual(expect.any(String));
    });
  });
  describe('from', () => {
    it('valid case', () => {
      const input = 'd6a5d94a-823d-4311-ae02-ee2c6569858e';
      const res = UserId.from(input);
      expect(res.value).toEqual(input);
    });
    it('empty occurs error', () => {
      const input = '';
      expect(() => {
        UserId.from(input);
      }).toThrow(Error);
    });
    it('Invalid letter occurs error', () => {
      const input = '🤪6a5d94a-823d-4311-ae02-ee2c6569858e';
      expect(() => {
        UserId.from(input);
      }).toThrow(Error);
    });
    it('too large length occurs error', () => {
      const input = 'd6a5d94a-823d-4311-ae02-ee2c6569858e';
      expect(() => {
        UserId.from(input);
      }).toThrow(Error);
    });
  });
});
