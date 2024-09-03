import { useEffect, useState } from 'react';
import { getCities } from '../../api/coffeeShops';
import { AboutUs } from './components/AboutUsSection';
import { AddCoffeeShopSection } from './components/AddCoffeeShopSection';
import { HeroSection } from './components/HeroSection';
import { MostPopularSection } from './components/MostPopularSection';
import { RecentlyAddedSection } from './components/RecentlyAddedSection';
import { City } from '../../shared/types/City';

type TrustBadges = Omit<City, 'id' | 'city_name' | 'map_svg'>;

const trustBadges: TrustBadges = {
  shops: 0,
  owners: 0,
  evaluations: 0,
  comments: 0,
};

export const HomePage = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [badges, setBadges] = useState<TrustBadges>(trustBadges);

  useEffect(() => {
    window.scrollTo({ top: 0 });

    getCities().then(data => {
      setCities(data);
      setSelectedCity(data[0]);

      setBadges(prev => {
        const newBadges = JSON.parse(JSON.stringify(prev));

        data.forEach(item => {
          for (const key in newBadges) {
            newBadges[key as keyof TrustBadges] +=
              item[key as keyof TrustBadges];
          }
        });

        return newBadges;
      });
    });
  }, []);

  return (
    <>
      <HeroSection
        cities={cities}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />
      <MostPopularSection />
      <AddCoffeeShopSection />
      <RecentlyAddedSection />
      <AboutUs trustBadges={badges} />
    </>
  );
};
