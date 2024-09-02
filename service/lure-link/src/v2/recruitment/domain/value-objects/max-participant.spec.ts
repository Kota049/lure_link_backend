import { MaxParticipant } from './max-participant';

describe('MaxParticipant', () => {
  describe('from', () => {
    it('get 1 to MaxParticipant ', () => {
      const input = 1;
      const res = MaxParticipant.from(input);
      expect(res.value).toEqual(input);
    });
    it('get 10 to MaxParticipant', () => {
      const input = 10;
      const res = MaxParticipant.from(input);
      expect(res.value).toEqual(input);
    });
  });
  describe('validate', () => {
    it('0 occurs error', () => {
      const input = 0;
      expect(() => {
        MaxParticipant.from(input);
      }).toThrow(Error);
    });
    it('11 occurs error', () => {
      const input = 11;
      expect(() => {
        MaxParticipant.from(input);
      }).toThrow(Error);
    });
  });
});
