/* eslint-disable max-len */
import classNames from 'classnames';
import { Button } from '../../../shared/components/Button';
import { HeroMap } from './HeroMap';
import searchIcon from '../../../assets/icons/search.svg';
import { HeaderH1 } from '../../../shared/components/typography/HeaderH1';
import { Bean } from '../../../shared/components/Bean';
import { City } from '../../../shared/types/City';
import { HeroBadges } from '../../../shared/types/HeroBadges';
import { HeroBadge } from './HeroBadge';

type Props = {
  cities: City[];
  selectedCity: City | null;
  setSelectedCity: React.Dispatch<React.SetStateAction<City | null>>;
};

export const HeroSection: React.FC<Props> = ({
  cities,
  selectedCity,
  setSelectedCity,
}) => {
  const changeCity = (city: string) => {
    const pickedCity = cities.find(item => item.city_name === city) || null;

    setSelectedCity(pickedCity);
  };

  const heroBadgeKeys = Object.keys(HeroBadges);
  const badges = Object.entries((selectedCity as City) || {})
    .filter(([key]) => heroBadgeKeys.includes(key as keyof typeof HeroBadges))
    .map(([key, value]) => [key, value]);

  return (
    <section className="relative pt-3 mb-20">
      {/* styly tabs */}
      <ul className="w-full grid grid-cols-12 gap-4 mb-[24px]">
        {cities.map(item => {
          const { id, city_name: city } = item;

          return (
            <li key={id} className="col-span-2">
              <button
                className={classNames(
                  'py-[8px] flex w-full justify-center border-b-2 border-primary/100',
                  {
                    'border-secondary/100': city === selectedCity?.city_name,
                  },
                )}
                onClick={() => changeCity(city)}
              >
                <span
                  className={classNames(
                    'font-primary font-semibold text-[18px] leading-[27px]',
                    {
                      'text-gray/30': city !== selectedCity?.city_name,
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

      <div className="w-full grid grid-cols-12 gap-4 py-20 bg-hero bg-center rounded-3xl overflow-hidden relative z-10">
        <div className="col-start-2 col-span-7 z-10">
          <HeaderH1 extraClasses="text-background/100 mb-5">
            A convenient way to find <br /> a coffee shop
          </HeaderH1>
          <p className="font-primary text-xl leading-6 text-background/100">
            Convenient search will help you quickly find a coffee <br />
            shop according to your needs
          </p>
        </div>

        {/* add square map */}
        <div className="w-full aspect-square col-span-3 col-start-9 z-10">
          <HeroMap map={selectedCity?.map_svg} />
        </div>

        <form
          action="#"
          className="flex gap-x-5 col-start-2 col-span-10 pt-6 mb-6 z-10"
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="location" className="relative w-full">
            <span
              style={{ maskImage: `url(${searchIcon})` }}
              className="bg-gray/100 w-6 h-6 bg-contain absolute left-[11px] translate-y-1/2"
            ></span>
            <input
              id="location"
              name="location"
              type="text"
              className="w-full py-2 px-[40px] rounded-lg border-2 bg-gray/10 border-default/100 placeholder:text-gray/100 placeholder:text-xl"
              placeholder="Location"
            />
          </label>
          <Button
            text="Filter"
            type="button"
            appearance="secondary"
            icon="filter"
          />
          <Button
            text="Search"
            type="submit"
            appearance="primary"
            icon="search"
          />
        </form>

        <div className="col-span-10 col-start-2 z-10">
          <ul className="flex gap-x-10 justify-end">
            {badges.map((item, index: number) => {
              return (
                <li key={index} className="flex flex-col items-center">
                  <HeroBadge
                    title={item[0] as keyof typeof HeroBadges}
                    value={item[1] as number}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <div className="absolute bg-black opacity-70 inset-0"></div>
      </div>

      <Bean
        size="200"
        positionClasses="absolute -bottom-[23%] -left-[10%] rotate-[135deg]"
      />
      <Bean
        size="100"
        positionClasses="absolute -bottom-[17%] right-[40%] rotate-[75deg]"
      />
    </section>
  );
};
