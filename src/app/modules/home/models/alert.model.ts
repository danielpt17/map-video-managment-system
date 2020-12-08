import {DescriptionEnum} from '../enums/description.enum';

export interface AlertModel {
  time: string;
  geolocation: IGeolocation;
  description: DescriptionEnum;
}

export interface IGeolocation {
  long: number;
  lat: number;
}
