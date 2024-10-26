import { Address } from './place-parts/address';
import { Description } from './place-parts/description';
import { Prefecture } from './place-parts/prefecture';

export class Place {
  prefecture: Prefecture;
  address: Address;
  description: Description;
  constructor(props: Place) {
    Object.assign(this, props);
  }
}
