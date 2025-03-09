import { Latitude } from './place-parts';
import { Address } from './place-parts/address';
import { Description } from './place-parts/description';
import { Longitude } from './place-parts/longitude';
import { Prefecture } from './place-parts/prefecture';

export class Place {
  // 緯度
  lattitude: Latitude;
  // 経度
  longitude: Longitude;
  // 説明
  description: Description;
  // 場所名
  placeName?: { prefecture: Prefecture; address: Address };
  constructor(props: Place) {
    Object.assign(this, props);
  }
}
