/* eslint-disable max-len */
import classNames from 'classnames';
import { City } from '../../../shared/types/City';

type Props = {
  cities: City[];
  selectedCity: City | null;
  changeCity: (city: string) => void;
};

export const HeroTabs: React.FC<Props> = ({
  cities,
  selectedCity,
  changeCity,
}) => {
  return (
    <ul className="w-full grid grid-cols-12 gap-4 mb-[24px]">
      {cities.map(item => {
        const { id, city_name: city } = item;

        return (
          <li key={id} className="col-span-2">
            <button
              className={classNames(
                'py-[8px] flex w-full justify-center border-b-2 text-gray/30 hover:border-primary/100 hover:text-primary/100 hover:bg-focused/100 transition',
                {
                  'border-secondary/100 pointer-events-none':
                    city === selectedCity?.city_name,
                  'border-gray/30': city !== selectedCity?.city_name,
                },
              )}
              onClick={() => changeCity(city)}
            >
              <span
                className={classNames(
                  'font-primary font-semibold text-[18px] leading-[27px]',
                  {
                    'text-secondary/100': city === selectedCity?.city_name,
                  },
                )}
              >
                {city}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};
