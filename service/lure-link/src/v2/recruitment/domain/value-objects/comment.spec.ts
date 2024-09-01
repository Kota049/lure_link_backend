import { Comment } from './comment';

describe('Comment', () => {
  describe('from', () => {
    it('valid input', () => {
      const input = '車で釣行します';
      const res = Comment.from(input);
      expect(res.value).toEqual(input);
    });
  });
  describe('validate', () => {
    it('empty string', () => {
      const input = '';
      const res = Comment.from(input);
      expect(res.value).toEqual(input);
    });
  });
});
