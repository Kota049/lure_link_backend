import { Description } from './description';

describe('Description', () => {
  describe('from', () => {
    it('valid input', () => {
      const input = 'ローソン川越駅前店が目印です';
      const res = Description.from(input);
      expect(res.value).toEqual(input);
    });
  });
  describe('validate', () => {
    it('empty string', () => {
      const input = '';
      const res = Description.from(input);
      expect(res.value).toEqual(input);
    });
  });
});
