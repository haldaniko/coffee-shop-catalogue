/* eslint-disable max-len */
import { Button } from '../../shared/components/Button';
import { Container } from '../../shared/components/Container';
import { PageGrid } from '../../shared/components/PageGrid';
import { HeaderH1 } from '../../shared/components/typography/HeaderH1';
import { SectionTitle } from '../../shared/components/typography/SectionTitle';
import { TextBodyP } from '../../shared/components/typography/TextBodyP';
import { CommentCard } from './CommentCard';
// import starIcon from '../../assets/icons/star.svg';
import { useEffect, useState } from 'react';
import { getCoffeeShop } from '../../api/coffeeShop';
import { useParams } from 'react-router-dom';
import { ICoffeeShop } from '../../shared/types/coffeeShop/CoffeeShop';
import {
  getCurrentDay,
  getCurrentHour,
  INITIAL_STATE,
  PRICING_POLICY,
} from './utils';
import { WorkTime } from '../../shared/types/coffeeShop/WorkTime';
import classNames from 'classnames';
import { Details } from '../../shared/components/Details';
import { WorkingTime } from './components/WorkingTime';
import { HeaderH4 } from '../../shared/components/typography/HeaderH4';
import { Frame } from './components/Frame';
import { SocialLink } from './components/SocialLink';
import { Bean } from '../../shared/components/Bean';

type IsOpened = {
  [key: string]: boolean;
};

const isOpened: IsOpened = {
  schedule: false,
};

export const CoffeeShop = () => {
  const [coffeeShop, setCoffeeShop] = useState<ICoffeeShop>(INITIAL_STATE);
  const { 'coffee-shop-id': coffeeShopId } = useParams();
  const [isScheduleOpen, setIsScheduleOpen] = useState(isOpened);

  const { website, email, phone, address, socials, reviews } = coffeeShop;
  const { city, street, district } = address;

  const socialsList = Object.entries(socials).filter(v => v[0] !== 'id');

  useEffect(() => {
    getCoffeeShop(Number(coffeeShopId))
      .then(data => {
        // eslint-disable-next-line no-console
        console.log('getCoffeeShop', data);

        setCoffeeShop(data);
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log('error');
      });
  }, [coffeeShopId]);

  const currentTime = getCurrentHour();
  const currentDay = getCurrentDay();

  const openingTime = coffeeShop?.work_time[
    `${currentDay}_open` as keyof Omit<WorkTime, 'id'>
  ].slice(0, -3);

  const closingTime = coffeeShop?.work_time[
    `${currentDay}_close` as keyof Omit<WorkTime, 'id'>
  ].slice(0, -3);

  let isCoffeeShopOpen = false;

  if (openingTime && closingTime) {
    isCoffeeShopOpen = currentTime > openingTime && currentTime < closingTime;
  }

  const activities = coffeeShop?.tags.filter(item => item.type === 'activity');
  const conveniences = coffeeShop?.tags.filter(
    item => item.type === 'convenience',
  );

  const type = coffeeShop?.is_network
    ? 'Network coffee shop'
    : 'Local coffee shops';

  return (
    <main className="grow relative">
      <Container>
        <PageGrid extraClasses="mb-4">
          <div className="col-span-9 flex gap-4">
            <HeaderH1 extraClasses="inline-block text-secondary/100">
              {coffeeShop?.name}
            </HeaderH1>

            <div>
              <p className="relative text-lg leading-[22px] text-gray/100 pl-7 pt-4 before:absolute before:block before:w-4 before:h-4 before:bg-primary/100 before:left-[5px] before:bottom-2 star">
                <span className="font-semibold text-2xl leading-8 text-secondary/100 mr-1">
                  {coffeeShop?.rating}
                </span>
                {`from ${coffeeShop?.evaluations} reviews`}
              </p>
            </div>
          </div>
          <TextBodyP extraClasses="col-span-3 pt-5 text-gray/100 text-right">
            Created by the owner
          </TextBodyP>
        </PageGrid>

        <div className="flex items-center mb-2">
          <p
            className={classNames(
              'relative font-semibold text-2xl star-marker after:bg-secondary/100 after:absolute after:w-5 after:h-5 after:block after:right-[6px] after:top-[38%] after:translate-y-[-50%] pr-8',
              {
                'text-success': isCoffeeShopOpen,
                'text-gray/30': !isCoffeeShopOpen,
              },
            )}
          >
            {isCoffeeShopOpen ? 'Open' : ' Closed'}
          </p>
          <p className="text-2xl leading-[36px] text-secondary/100">
            {isCoffeeShopOpen
              ? `Closes at ${closingTime}`
              : `Opens at ${openingTime}`}
          </p>
        </div>
        <Details
          isOpen={isScheduleOpen}
          setIsOpen={setIsScheduleOpen}
          name={'schedule'}
          title={'Working time'}
          extraClasses="mb-10"
        >
          <WorkingTime
            schedule={coffeeShop?.work_time}
            currentDay={currentDay}
          />
        </Details>

        <Bean
          size="80"
          positionClasses="absolute top-[140px] right-0 rotate-[20deg]"
        />

        <section className="mb-20 relative">
          <SectionTitle>Details</SectionTitle>
          <PageGrid extraClasses="relative z-10">
            <Frame extraClasses="col-span-3">
              <HeaderH4 extraClasses="mb-4">Pricing policy</HeaderH4>
              <TextBodyP extraClasses="relative before:absolute before:block before:w-6 before:h-6 before:bg-primary/100 before:left-0 before:top-[-1px] budget pl-10">
                {coffeeShop ? PRICING_POLICY[coffeeShop?.price_rate] : 'TBD'}
              </TextBodyP>
            </Frame>

            <Frame extraClasses="col-span-3">
              <HeaderH4 extraClasses="mb-4">Type</HeaderH4>
              <TextBodyP extraClasses="relative before:absolute before:block before:w-6 before:h-6 before:bg-primary/100 before:left-0 before:top-[-1px] network pl-10">
                {type || 'TBD'}
              </TextBodyP>
            </Frame>

            <Frame extraClasses="col-span-3">
              <HeaderH4 extraClasses="mb-4">Activities</HeaderH4>
              {activities?.map((item, index) => {
                return <TextBodyP key={index}>{item.name}</TextBodyP>;
              })}
            </Frame>

            <Frame extraClasses="col-span-3">
              <HeaderH4 extraClasses="mb-4">Conveniences</HeaderH4>
              {conveniences?.map((item, index) => {
                return <TextBodyP key={index}>{item.name}</TextBodyP>;
              })}
            </Frame>
          </PageGrid>

          <Bean
            size="150"
            positionClasses="absolute top-0 left-[56%] rotate-[155deg]"
          />
        </section>

        <section className="mb-20 relative">
          <SectionTitle>Contacts</SectionTitle>
          <PageGrid extraClasses=" relative z-10">
            <div className="col-span-3">
              <Frame extraClasses="mb-[24px]">
                <HeaderH4 extraClasses="mb-4">Tel.</HeaderH4>
                <TextBodyP>{phone}</TextBodyP>
              </Frame>
              <Frame extraClasses="mb-[24px]">
                <HeaderH4 extraClasses="mb-4">Email</HeaderH4>
                <TextBodyP>{email}</TextBodyP>
              </Frame>
              <Frame>
                <HeaderH4 extraClasses="mb-4">Website</HeaderH4>
                <TextBodyP>{website}</TextBodyP>
              </Frame>
            </div>
            <div className="col-span-3">
              <Frame extraClasses="mb-[24px]">
                <HeaderH4 extraClasses="mb-4">Address</HeaderH4>
                <TextBodyP extraClasses="mb-2">{city}</TextBodyP>
                <TextBodyP extraClasses="mb-2">{district}</TextBodyP>
                <TextBodyP>{street}</TextBodyP>
              </Frame>
              <Frame>
                <HeaderH4 extraClasses="mb-4">Social</HeaderH4>
                <ul className="flex gap-6">
                  {socialsList.map((item, index) => {
                    const [network, url] = item;

                    return (
                      <li key={index}>
                        <SocialLink to={url as string} network={network} />
                      </li>
                    );
                  })}
                </ul>
              </Frame>
            </div>
            <div className="col-span-6 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="338"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=%D0%B2%D1%83%D0%BB%D0%B8%D1%86%D1%8F%20%D0%9E%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%D0%B0%20%D0%9A%D0%BE%D0%BD%D0%B8%D1%81%D1%8C%D0%BA%D0%BE%D0%B3%D0%BE,%2055,%20%D0%9A%D0%B8%D1%97%D0%B2,%2004050+(%D0%A8%D0%B0%D1%80%D0%BB%D0%BE%D1%82%D1%82%D0%B0)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              >
                <a href="https://www.gps.ie/">gps tracker sport</a>
              </iframe>
            </div>
          </PageGrid>

          <Bean
            size="200"
            positionClasses="absolute top-[13%] -left-[9%] rotate-[155deg]"
          />
        </section>

        <section className="mb-20">
          <div className="flex justify-between">
            <SectionTitle>Reviews</SectionTitle>
            <Button type="button" appearance="primary" icon="plus">
              Add review
            </Button>
          </div>
          <ul className="flex flex-col gap-4">
            {reviews.results.map((item, index) => {
              const {
                author: { username },
                created_at: createdAt,
                title,
                stars,
                text,
                likes,
                dislikes,
              } = item;

              return (
                <li key={index}>
                  <CommentCard
                    name={username}
                    createdAt={createdAt.slice(0, 10)}
                    title={title}
                    evaluation={stars}
                    comment={text}
                    likes={likes}
                    dislikes={dislikes}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      </Container>
    </main>
  );
};
