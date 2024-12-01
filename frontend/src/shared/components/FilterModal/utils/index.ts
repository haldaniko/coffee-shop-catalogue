import {
  IPrice,
  ITagActivities,
  ITagConveniences,
} from '../../../types/filterForm/FilterFormValues';
import { normalizeWhitespace } from '../../../utils';

export const getInputTextValue = (input: string) => {
  return normalizeWhitespace(input).replace(/\s/g, '%20');
};

export const getTags = (act: ITagActivities, conv: ITagConveniences) => {
  const tags = Object.assign(act, conv);
  const res = [];

  for (const key in tags) {
    if (tags[key as keyof typeof tags]) {
      res.push(key);
    }
  }

  return res.map(v => v.replace(/_/g, '%20')).join(',');
};

export const getPricingRate = (priceValues: IPrice) => {
  const { budgetary, middle, premium } = priceValues;
  const pricingRate = [budgetary && 1, middle && 2, premium && 3];

  return pricingRate.filter(v => v).join(',');
};

export const getIsNetwork = (value: string) => {
  if (value === 'allTypes') {
    return '';
  }

  return value === 'network' || 'false';
};
