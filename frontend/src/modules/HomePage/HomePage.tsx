import { useEffect, useState } from 'react';
// import { getCities } from '../../api/coffeeShops';
import { AboutUs } from './components/AboutUsSection';
import { AddCoffeeShopSection } from './components/AddCoffeeShopSection';
import { HeroSection } from './components/HeroSection';
import { MostPopularSection } from './components/MostPopularSection';
import { RecentlyAddedSection } from './components/RecentlyAddedSection';
import { City } from '../../shared/types/City';
import { getCityStats } from '../../api/cityStats';
import { getListsOfCoffeeShops } from '../../api/listsOfCoffeeShops';
import { ICoffeeShopCard } from '../../shared/types/coffeeShop/CoffeeShopCard';

// type TrustBadges = Omit<City, 'id' | 'city_name' | 'map_svg'>;

// const trustBadges: TrustBadges = {
//   shops: 0,
//   owners: 0,
//   evaluations: 0,
//   comments: 0,
// };

export const HomePage = () => {
  // const [cities, setCities] = useState<City[]>([]);
  // const [badges, setBadges] = useState<TrustBadges>(trustBadges);

  const [cityStats, setCityStats] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [popular, setPopular] = useState<ICoffeeShopCard[] | null>(null);
  const [recent, setRecent] = useState<ICoffeeShopCard[] | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });

    getCityStats()
      .then(data => {
        // eslint-disable-next-line no-console
        console.log('homepage useEffect in getCityStats', data);

        setCityStats(data);
        setSelectedCity(data[0]);
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log('error');
      });

    getListsOfCoffeeShops()
      .then(data => {
        // eslint-disable-next-line no-console
        console.log('homepage useEffect in getListsOfCoffeeShops', data);

        setPopular(data.popular);
        setRecent(data.recent);
        // setSelectedCity(data[0]);
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log('error');
      });
    // getCities().then(data => {
    //   setCities(data);
    //   setSelectedCity(data[0]);

    //   setBadges(prev => {
    //     const newBadges = JSON.parse(JSON.stringify(prev));

    //     data.forEach(item => {
    //       for (const key in newBadges) {
    //         newBadges[key as keyof TrustBadges] +=
    //           item[key as keyof TrustBadges];
    //       }
    //     });

    //     return newBadges;
    //   });
    // });
  }, []);

  // eslint-disable-next-line no-console
  console.log('homepage cityStats = ', cityStats, { popular });

  return (
    <>
      <HeroSection
        cities={cityStats}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />
      <MostPopularSection coffeeShops={popular} />
      <AddCoffeeShopSection />
      <RecentlyAddedSection coffeeShops={recent} />
      <AboutUs
        shops={selectedCity?.shops || 0}
        owners={selectedCity?.owners || 0}
        evaluations={selectedCity?.evaluations || 0}
        comments={selectedCity?.comments || 0}
      />
    </>
  );
};
