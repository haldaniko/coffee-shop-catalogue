/* eslint-disable max-len */
import { CoffeeShopCard } from '../../../shared/components/CoffeeShopCard';
import { PageGrid } from '../../../shared/components/PageGrid';
import { SectionTitle } from '../../../shared/components/typography/SectionTitle';
import imgZakapelok from '../../../assets/images/preview-zakapelok.jpg';
import imgArtVillage from '../../../assets/images/preview-art-village.jpg';
import imgLvivCroissants from '../../../assets/images/preview-lviv-croissants.jpg';
import { Bean } from '../../../shared/components/Bean';
import { Container } from '../../../shared/components/Container';

const recentlyAdded = [
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

export const RecentlyAddedSection = () => {
  return (
    <section>
      <Container>
        <div className="relative mb-20">
          <SectionTitle>Recently added</SectionTitle>
          <PageGrid>
            <ul className="flex gap-4 col-span-4 mb-[24px]">
              {recentlyAdded.map((cs, index) => {
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
          </PageGrid>

          <Bean
            size="80"
            positionClasses="absolute top-[65%] -left-[8%] rotate-[5deg]"
          />
        </div>
      </Container>
    </section>
  );
};
