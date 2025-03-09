import { Place } from './place';
import { Description, Latitude } from './place-parts';
import { Longitude } from './place-parts/longitude';

describe('Place', () => {
  describe('constructor', () => {
    it('valid case', () => {
      const inputs = {
        lattitude: Latitude.from('000000'),
        longitude: Longitude.from('川越市元町1丁目3番地1'),
        description: Description.from(''),
      };
      const res = new Place(inputs);
      expect(res.lattitude.value).toEqual(inputs.lattitude.value);
      expect(res.longitude.value).toEqual(inputs.longitude.value);
      expect(res.description.value).toEqual(inputs.description.value);
    });
  });
});
