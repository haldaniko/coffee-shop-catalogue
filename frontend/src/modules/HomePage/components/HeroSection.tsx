/* eslint-disable max-len */
import { Button } from '../../../shared/components/Button';
import { HeroMap } from './HeroMap';
import searchIcon from '../../../assets/icons/search.svg';
import { HeaderH1 } from '../../../shared/components/typography/HeaderH1';
import { Bean } from '../../../shared/components/Bean';
import { City } from '../../../shared/types/City';
import { HeroBadges } from '../../../shared/types/HeroBadges';
import { HeroBadge } from './HeroBadge';
import { useEffect, useRef } from 'react';
import { FilterModal } from '../../../shared/components/FilterModal';
import { Container } from '../../../shared/components/Container';
import { HeroTabs } from './HeroTabs';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getInputTextValue } from '../../../shared/components/FilterModal/utils';

interface IFormSearchInput {
  searchValue: string;
}

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
  const { register, handleSubmit } = useForm<IFormSearchInput>();
  const navigate = useNavigate();

  const onSearchSubmit: SubmitHandler<IFormSearchInput> = ({ searchValue }) => {
    const validValue = getInputTextValue(searchValue);

    const path = `/coffeeshops/${validValue ? `?address=${validValue}` : ''}`;

    navigate(path);
  };

  const modalRef = useRef<HTMLDialogElement | null>(null);
  const changeCity = (city: string) => {
    const pickedCity = cities.find(item => item.city_name === city) || null;

    setSelectedCity(pickedCity);
  };

  const heroBadgeKeys = Object.keys(HeroBadges);
  const badges = Object.entries((selectedCity as City) || {})
    .filter(([key]) => heroBadgeKeys.includes(key as keyof typeof HeroBadges))
    .map(([key, value]) => [key, value]);

  const closeModal = () => {
    modalRef.current?.close();

    document.documentElement.style.overflow = '';
  };

  const openModal = () => {
    modalRef.current?.showModal();

    document.documentElement.style.overflow = 'hidden';

    modalRef.current?.addEventListener('close', closeModal);
  };

  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = '';
      // eslint-disable-next-line react-hooks/exhaustive-deps
      modalRef.current?.removeEventListener('close', closeModal);
    };
  }, []);

  const filterCities = cities.map(v => v.city_name);

  // eslint-disable-next-line no-console
  console.log('Hero section');

  return (
    <>
      <FilterModal
        selectedCity={selectedCity?.city_name || 'Kyiv'}
        cities={filterCities}
        modalRef={modalRef}
        closeModal={closeModal}
      />
      <section>
        <Container>
          <div className="pt-3 mb-20">
            <HeroTabs
              cities={cities}
              selectedCity={selectedCity}
              changeCity={changeCity}
            />

            <div className="w-full grid grid-cols-12 gap-4 py-20 bg-hero bg-center rounded-3xl overflow-hidden relative z-10">
              <div className="col-start-2 col-span-7 z-10">
                <HeaderH1 extraClasses="text-background/100 mb-5">
                  A convenient way to find <br /> a coffee shop
                </HeaderH1>
                <p className="text-xl leading-6 text-background/100">
                  Convenient search will help you quickly find a coffee <br />
                  shop according to your needs
                </p>
              </div>

              <div className="w-full aspect-square col-span-3 col-start-9 z-10">
                <HeroMap
                  city={selectedCity?.city_name}
                  map={selectedCity?.map_svg}
                />
              </div>

              <form
                onSubmit={handleSubmit(onSearchSubmit)}
                className="flex gap-x-5 col-start-2 col-span-10 pt-6 mb-6 z-10"
              >
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="location" className="relative w-full">
                  <span
                    style={{ maskImage: `url(${searchIcon})` }}
                    className="bg-gray/100 w-6 h-6 bg-contain absolute left-[11px] translate-y-1/2"
                  ></span>
                  <input
                    {...register('searchValue')}
                    type="text"
                    className="w-full py-2 px-[40px] rounded-lg border-2 bg-gray/10 border-default/100 placeholder:text-gray/100 placeholder:text-xl"
                    placeholder="Location"
                  />
                </label>
                <Button
                  type="button"
                  appearance="secondary"
                  second
                  icon="filter"
                  action={openModal}
                >
                  Filter
                </Button>
                <Button type="submit" appearance="primary" icon="search">
                  Search
                </Button>
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
          </div>
        </Container>
      </section>
    </>
  );
};
