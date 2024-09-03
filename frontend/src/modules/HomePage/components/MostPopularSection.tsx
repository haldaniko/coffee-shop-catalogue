/* eslint-disable max-len */
import { CoffeeShopCard } from '../../../shared/components/CoffeeShopCard';
import { PageGrid } from '../../../shared/components/PageGrid';
import { SectionTitle } from '../../../shared/components/typography/SectionTitle';
import imgZakapelok from '../../../assets/images/preview-zakapelok.jpg';
import imgArtVillage from '../../../assets/images/preview-art-village.jpg';
import imgLvivCroissants from '../../../assets/images/preview-lviv-croissants.jpg';
// import beanIcon from '../../../assets/icons/coffee-bean.svg';
import { Bean } from '../../../shared/components/Bean';

const mostPopular = [
  {
    image: imgZakapelok,
    title: 'ZAKAPELOK',
    address: 'Yaroslavska St, 47/29, Kyiv, 04070',
    rating: 4.8,
    price: 1,
  },
  {
    image: imgArtVillage,
    title: ' Art Village',
    address: `Naberezhno-Khreshachatyts'ka St, 39`,
    rating: 5,
    price: 2,
  },
  {
    image: imgLvivCroissants,
    title: 'Lviv Croissants',
    address: 'Verkhnii Val St, 54',
    rating: 4.7,
    price: 0,
  },
];

export const MostPopularSection = () => {
  return (
    <section className="relative mb-20">
      <SectionTitle>Most Popular</SectionTitle>
      <PageGrid>
        <ul className="flex gap-4 col-span-4 mb-[24px] z-10">
          {mostPopular.map((cs, index) => {
            const { image, title, address, rating, price } = cs;

            return (
              <li key={index} className="min-w-full">
                <CoffeeShopCard
                  image={image}
                  title={title}
                  address={address}
                  rating={rating}
                  price={price}
                />
              </li>
            );
          })}
        </ul>

        <ul className="col-start-5 col-span-4 row-start-2 flex gap-10 justify-center">
          <li className="block w-[10px] h-[10px] rounded-full bg-secondary/100 mb-0"></li>
          <li className="block w-[10px] h-[10px] rounded-full bg-gray/30 mb-0"></li>
          <li className="block w-[10px] h-[10px] rounded-full bg-gray/30 mb-0"></li>
        </ul>

        {/* <span
          style={{
            maskImage: `url(${beanIcon})`,
            maskRepeat: 'no-repeat',
            maskSize: 'contain',
          }}
          className="absolute -bottom-[50px] -right-[80px] flex w-[150px] h-[150px] bg-green rotate-[30deg]"
        ></span> */}
        <div className="absolute w-[150px] h-[150px] -bottom-[15px] -right-[110px] rotate-[30deg]">
          <Bean extraClasses="stroke-1 stroke-primary/100" />
        </div>
      </PageGrid>
    </section>
  );
};
