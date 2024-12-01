/* eslint-disable max-len */
import { CoffeeShopCard } from '../../../shared/components/CoffeeShopCard';
import { PageGrid } from '../../../shared/components/PageGrid';
import { SectionTitle } from '../../../shared/components/typography/SectionTitle';
import { Bean } from '../../../shared/components/Bean';
import { Container } from '../../../shared/components/Container';
import { ICoffeeShopCard } from '../../../shared/types/coffeeShop/CoffeeShopCard';

type Props = {
  coffeeShops: ICoffeeShopCard[] | null;
};

export const MostPopularSection: React.FC<Props> = ({ coffeeShops }) => {
  return (
    <section>
      <Container>
        <div className="relative mb-20">
          <SectionTitle>Most Popular</SectionTitle>
          <PageGrid>
            <ul className="flex gap-4 col-span-4 mb-[24px] z-10">
              {coffeeShops?.map((cs, index) => {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                const { id, image, name, address, rating, price_rate } = cs;

                return (
                  <li key={index} className="min-w-full">
                    <CoffeeShopCard
                      id={id}
                      image={image}
                      title={name}
                      address={address}
                      rating={rating}
                      price={price_rate}
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
            <Bean
              size="150"
              positionClasses="absolute bottom-[2%] -right-[11%] rotate-[105deg]"
            />
          </PageGrid>
        </div>
      </Container>
    </section>
  );
};
