/* eslint-disable max-len */
import { Bean } from '../../../shared/components/Bean';
import { SectionTitle } from '../../../shared/components/typography/SectionTitle';
import arrowIcon from '../../../assets/icons/arrow.svg';
import cup from '../../../assets/images/coffee-cup.png';
import { Container } from '../../../shared/components/Container';

export const AddCoffeeShopSection = () => {
  return (
    <section>
      <Container>
        <div className="relative mb-20">
          <SectionTitle>Add a coffee shop</SectionTitle>

          <div className="border border-primary/100 rounded-lg p-10 bg-background/100 flex justify-between relative z-10">
            <div>
              <h4 className="font-primary font-semibold text-[24px] leading-[32px] text-secondary/100 mb-1">
                Didn&apos;t find your favorite coffee shop in our catalog?
              </h4>
              <p className="font-primary text-[18px] leading-[22px] text-secondary/100 mb-10">
                Help us become even better and add it by filling out the form.
              </p>

              <a href="#" className="flex gap-1 items-center">
                <span className="font-primary font-semibold text-[18px] leading-[27px] text-primary/100">
                  Add a coffee shop
                </span>
                <span
                  style={{ maskImage: `url(${arrowIcon})` }}
                  className="block w-6 h-6 bg-primary/100"
                ></span>
              </a>
            </div>

            <div>
              <span
                style={{
                  maskImage: `url(${cup})`,
                  maskSize: 'cover',
                  maskRepeat: 'no-repeat',
                }}
                className="block w-[124px] h-[124px] bg-primary/100"
              ></span>
            </div>
          </div>

          <Bean
            size="150"
            positionClasses="absolute -top-[10%] right-[21%] rotate-[105deg]"
          />
          <Bean
            size="100"
            positionClasses="absolute -bottom-[42%] left-[40%] rotate-[60deg]"
          />
        </div>
      </Container>
    </section>
  );
};
