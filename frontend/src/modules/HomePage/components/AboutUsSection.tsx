/* eslint-disable max-len */
import { HeaderH3 } from '../../../shared/components/typography/HeaderH3';
import { SectionTitle } from '../../../shared/components/typography/SectionTitle';
import arrowIcon from '../../../assets/icons/arrow.svg';
import starMarkerIcon from '../../../assets/icons/star-marker.svg';
import shopIcon from '../../../assets/icons/coffee-shop.svg';
import ownerIcon from '../../../assets/icons/owner.svg';
import starIcon from '../../../assets/icons/star.svg';
import commentsIcon from '../../../assets/icons/comments.svg';
import { useState } from 'react';
import classNames from 'classnames';
import { PageGrid } from '../../../shared/components/PageGrid';
import { Bean } from '../../../shared/components/Bean';
import { City } from '../../../shared/types/City';

type IsOpened = {
  [key: string]: boolean;
};

const isOpened: IsOpened = {
  team: false,
  mission: false,
  join: false,
};

type Props = {
  trustBadges: Omit<City, 'id' | 'city_name' | 'map_svg'>;
};

export const AboutUs: React.FC<Props> = ({ trustBadges }) => {
  const [isOpen, setIsOpen] = useState<IsOpened>(isOpened);
  const { shops, owners, evaluations, comments } = trustBadges;

  return (
    <section className="mb-20">
      <SectionTitle>About Us</SectionTitle>

      <div className="relative">
        <ul className="relative flex flex-col gap-6 z-10">
          <li className="bg-background/100">
            <details className="border-2 rounded-lg border-primary/100 dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-4">
              <summary
                onClick={() =>
                  setIsOpen(prevState => ({
                    ...prevState,
                    team: !prevState.team,
                  }))
                }
                className="list-none select-none cursor-pointer outline-none"
              >
                <div className="flex justify-between items-center">
                  <HeaderH3>About our team</HeaderH3>
                  <span
                    style={{ maskImage: `url(${arrowIcon})` }}
                    className={classNames('block w-6 h-6 bg-primary/100', {
                      '-rotate-90': isOpen.team,
                      'rotate-90': !isOpen.team,
                    })}
                  ></span>
                </div>
              </summary>
              <div className="relative pt-4 font-primary text-[24px] leading-[36px] text-secondary/100">
                <span
                  style={{
                    maskImage: `url(${starMarkerIcon})`,
                    maskSize: 'cover',
                    maskRepeat: 'no-repeat',
                  }}
                  className="absolute left-0 top-[22px] block w-5 h-5 bg-primary/100"
                ></span>
                <p className="pl-7">
                  We are a team of enthusiasts who unite people through the love
                  of coffee. Our service is . created for those who cannot
                  imagine their day without an aromatic cup of coffee in a cozy
                  place. We help you find the best coffee shops in your city -
                  from cozy family cafes to stylish urban coffee shops.
                </p>
              </div>
            </details>
          </li>

          <li className="bg-background/100">
            <details className="border-2 rounded-lg border-primary/100 dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-4">
              <summary
                onClick={() =>
                  setIsOpen(prevState => ({
                    ...prevState,
                    mission: !prevState.mission,
                  }))
                }
                className="list-none select-none cursor-pointer outline-none"
              >
                <div className="flex justify-between items-center">
                  <HeaderH3>About our mission</HeaderH3>
                  <span
                    style={{ maskImage: `url(${arrowIcon})` }}
                    className={classNames('block w-6 h-6 bg-primary/100', {
                      '-rotate-90': isOpen.mission,
                      'rotate-90': !isOpen.mission,
                    })}
                  ></span>
                </div>
              </summary>
              <div className="relative pt-4 font-primary text-[24px] leading-[36px] text-secondary/100">
                <span
                  style={{
                    maskImage: `url(${starMarkerIcon})`,
                    maskSize: 'cover',
                    maskRepeat: 'no-repeat',
                  }}
                  className="absolute left-0 top-[22px] block w-5 h-5 bg-primary/100"
                ></span>
                <p className="pl-7">
                  Our mission is to make every coffee break special, helping you
                  discover new places to meet, work and relax. Thanks to our
                  recommendations, you will always be able to find the perfect
                  place for your coffee – whether it&apos;s a morning coffee
                  work, a Sunday brunch or an evening meeting with friends.
                </p>
              </div>
            </details>
          </li>

          <li className="bg-background/100">
            <details className="border-2 rounded-lg border-primary/100 dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-4">
              <summary
                onClick={() =>
                  setIsOpen(prevState => ({
                    ...prevState,
                    join: !prevState.join,
                  }))
                }
                className="list-none select-none cursor-pointer outline-none"
              >
                <div className="flex justify-between items-center">
                  <HeaderH3>Join us</HeaderH3>
                  <span
                    style={{ maskImage: `url(${arrowIcon})` }}
                    className={classNames('block w-6 h-6 bg-primary/100', {
                      '-rotate-90': isOpen.join,
                      'rotate-90': !isOpen.join,
                    })}
                  ></span>
                </div>
              </summary>
              <div className="relative pt-4 font-primary text-[24px] leading-[36px] text-secondary/100 mb-[24px]">
                <span
                  style={{
                    maskImage: `url(${starMarkerIcon})`,
                    maskSize: 'cover',
                    maskRepeat: 'no-repeat',
                  }}
                  className="absolute left-0 top-[22px] block w-5 h-5 bg-primary/100"
                ></span>
                <p className="pl-7">
                  Join us, and together we will open the world of coffee shops,
                  where everyone will find something special.
                </p>
              </div>

              <PageGrid>
                <div className="col-span-3 flex flex-col items-center">
                  <p className="relative w-fit pl-10 font-primary font-semibold text-[32px] leading-[44px] text-secondary/100">
                    {shops}
                    <span
                      style={{
                        maskImage: `url(${shopIcon})`,
                        maskSize: 'cover',
                        maskRepeat: 'no-repeat',
                      }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 block w-6 h-6 bg-secondary/100"
                    ></span>
                  </p>
                  <p className="w-fit font-primary font-semibold text-[18px] leading-[27px] text-secondary/100">
                    Coffee Shops
                  </p>
                </div>

                <div className="col-span-3 flex flex-col items-center">
                  <p className="relative w-fit pl-10 font-primary font-semibold text-[32px] leading-[43px] text-secondary/100">
                    {owners}
                    <span
                      style={{
                        maskImage: `url(${ownerIcon})`,
                        maskSize: 'cover',
                        maskRepeat: 'no-repeat',
                      }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 block w-6 h-6 bg-secondary/100"
                    ></span>
                  </p>
                  <p className="w-fit font-primary font-semibold text-[18px] leading-[27px] text-secondary/100">
                    Owners
                  </p>
                </div>

                <div className="col-span-3 flex flex-col items-center">
                  <p className="relative w-fit pl-10 font-primary font-semibold text-[32px] leading-[43px] text-secondary/100">
                    {evaluations}
                    <span
                      style={{
                        maskImage: `url(${starIcon})`,
                        maskSize: 'cover',
                        maskRepeat: 'no-repeat',
                      }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 block w-6 h-6 bg-secondary/100"
                    ></span>
                  </p>
                  <p className="w-fit font-primary font-semibold text-[18px] leading-[27px] text-secondary/100">
                    Evaluations
                  </p>
                </div>

                <div className="col-span-3 flex flex-col items-center">
                  <p className="relative w-fit pl-10 font-primary font-semibold text-[32px] leading-[43px] text-secondary/100">
                    {comments}
                    <span
                      style={{
                        maskImage: `url(${commentsIcon})`,
                        maskSize: 'cover',
                        maskRepeat: 'no-repeat',
                      }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 block w-6 h-6 bg-secondary/100"
                    ></span>
                  </p>
                  <p className="w-fit font-primary font-semibold text-[18px] leading-[27px] text-secondary/100">
                    Comments
                  </p>
                </div>
              </PageGrid>
            </details>
          </li>
        </ul>

        <Bean
          size="150"
          positionClasses="absolute top-[50%] -right-[11%] rotate-[105deg]"
        />
      </div>
    </section>
  );
};
