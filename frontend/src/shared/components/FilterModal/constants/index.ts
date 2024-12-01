import { IActivities } from '../../../types/filterForm/Activities';
import { IConveniences } from '../../../types/filterForm/Conveniences';
import { IDistricts } from '../../../types/filterForm/Districts';
import { ITimeOptions } from '../../../types/filterForm/TimeOptions';

export const DISTRICTS: IDistricts = {
  Kyiv: [
    {
      label: 'Select district',
      value: '',
    },
    {
      label: 'Shevchenkivskyi',
      value: 'Shevchenkivskyi',
    },
    {
      label: 'Pecheriskyi',
      value: 'Pecheriskyi',
    },
    {
      label: 'Holosiivskyi',
      value: 'Holosiivskyi',
    },
    {
      label: 'Sviatoshynskyi',
      value: 'Sviatoshynskyi',
    },
    {
      label: 'Obolonskyi',
      value: 'Obolonskyi',
    },
    {
      label: 'Desnianskyi',
      value: 'Desnianskyi',
    },
    {
      label: 'Dniprovskyi',
      value: 'Dniprovskyi',
    },
    {
      label: 'Podilskyi',
      value: 'Podilskyi',
    },
    {
      label: 'Kyivskyi',
      value: 'Kyivskyi',
    },
  ],
  Lviv: [
    {
      label: 'Select district',
      value: '',
    },
    {
      label: 'a',
      value: 'a',
    },
    {
      label: 'b',
      value: 'b',
    },
  ],
};

export const TIME_OPTIONS: ITimeOptions = {
  openning: [
    { label: 'Opens...', value: '' },
    { label: '08:00', value: '08:00' },
    { label: '09:00', value: '09:00' },
    { label: '10:00', value: '10:00' },
  ],
  closing: [
    { label: 'Closes...', value: '' },
    { label: '08:00', value: '08:00' },
    { label: '09:00', value: '09:00' },
    { label: '10:00', value: '10:00' },
    { label: '11:00', value: '11:00' },
  ],
};

export const ACTIVITIES: IActivities[] = [
  {
    id: 'books',
    label: 'Books',
  },
  {
    id: 'board_games',
    label: 'Board games',
  },
  {
    id: 'live_music',
    label: 'Live music',
  },
  {
    id: 'pets',
    label: 'Pets',
  },
];

export const CONVENIENCES: IConveniences[] = [
  {
    id: 'wifi',
    label: 'WiFi',
  },
  {
    id: 'restroom',
    label: 'Restroom',
  },
  {
    id: 'delivery',
    label: 'Delivery',
  },
  {
    id: 'booking',
    label: 'Booking',
  },
  {
    id: 'parking',
    label: 'Parking',
  },
  {
    id: 'terrace',
    label: 'Terrace',
  },
];
