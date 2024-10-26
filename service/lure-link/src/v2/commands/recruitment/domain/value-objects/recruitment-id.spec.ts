import { RecruitmentId } from './recruitment-id';

describe('RecruitmentId', () => {
  describe('generate', () => {
    it('generate one', () => {
      const res = RecruitmentId.generate();
      expect(res.value).toEqual(expect.any(String));
    });
  });
  describe('from', () => {
    it('valid case', () => {
      const input = '01AN4Z07BY79KA1307SR9X4MV3';
      const res = RecruitmentId.from(input);
      expect(res.value).toEqual(input);
    });
    it('empty occurs error', () => {
      const input = '';
      expect(() => {
        RecruitmentId.from(input);
      }).toThrow(Error);
    });
    it('Invalid letter occurs error', () => {
      const input = '🤪N4Z07BY79KA1307SR9X4MV3';
      expect(() => {
        RecruitmentId.from(input);
      }).toThrow(Error);
    });
    it('too large length occurs error', () => {
      const input = '01AN4Z07BY79KA1307SR9X4MV3A';
      expect(() => {
        RecruitmentId.from(input);
      }).toThrow(Error);
    });
  });
});
