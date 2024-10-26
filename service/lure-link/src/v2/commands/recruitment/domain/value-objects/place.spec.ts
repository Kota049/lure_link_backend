import { Place } from './place';
import {
  Address,
  Description,
  Prefecture,
  PrefectureValue,
} from './place-parts';

describe('Place', () => {
  describe('constructor', () => {
    it('valid case', () => {
      const inputs = {
        prefecture: Prefecture.from(PrefectureValue.saitama),
        address: Address.from('川越市元町1丁目3番地1'),
        description: Description.from(''),
      };
      const res = new Place(inputs);
      expect(res.address.value).toEqual(inputs.address.value);
      expect(res.prefecture.value).toEqual(inputs.prefecture.value);
      expect(res.description.value).toEqual(inputs.description.value);
    });
  });
});
