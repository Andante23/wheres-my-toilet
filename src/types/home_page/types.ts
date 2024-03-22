import { ChangeEvent } from 'react';

export type Location = {
  toilet_address: string;
  toilet_baby_diaper: string | null;
  toilet_id: number;
  toilet_latitude: number;
  toilet_longitude: number;
  toilet_name: string;
  toilet_opening_hours: string | null;
};

export type UserLocation = {
  lat: number;
  lng: number;
};

export type HomePageType = {
  userLocation: UserLocation;
  filterData: Location[] | undefined;
  nearestLocation: Location | null;
};

export type HomeSelectFormType = {
  selectSee: string;
  selectGunGue: string;
  handleSelectCity(event: ChangeEvent<HTMLSelectElement>): void;
  handleSelectCounty(event: ChangeEvent<HTMLSelectElement>): void;
};

export type Distance = {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
};
