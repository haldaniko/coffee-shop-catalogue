/* eslint-disable max-len */
import { Button } from '../../shared/components/Button';
import { Container } from '../../shared/components/Container';
import { PageGrid } from '../../shared/components/PageGrid';
import { HeaderH1 } from '../../shared/components/typography/HeaderH1';
import { HeaderH3 } from '../../shared/components/typography/HeaderH3';
import { SectionTitle } from '../../shared/components/typography/SectionTitle';
import { TextBodyP } from '../../shared/components/typography/TextBodyP';
import { CommentCard } from './CommentCard';
// import starIcon from '../../assets/icons/star.svg';
import twitterIcon from '../../assets/icons/twitter.svg';
import facebookIcon from '../../assets/icons/facebook.svg';
import instagramIcon from '../../assets/icons/instagram.svg';

type TMockComment = {
  id: number;
  user: {
    id: number;
    name: string;
    ava: string;
  };
  title: string;
  comment: string;
  evaluation: number;
  likes: number;
  dislikes: number;
  createdAt: string;
};

const mockComments: TMockComment[] = [
  {
    id: 1,
    user: {
      id: 23,
      name: 'Julia',
      ava: 'image',
    },
    title: 'Delicious coffee',
    comment:
      'Excellent service, delicious coffee, an ideal choice for any time of the day. This is my favorite corner of the city!',
    evaluation: 5,
    likes: 10,
    dislikes: 0,
    createdAt: '2023-01-10',
  },
  {
    id: 2,
    user: {
      id: 223,
      name: 'Eugene',
      ava: 'image',
    },
    title: 'Cool coffee shop',
    comment:
      'I have never tried a better latte than here! The interior is modern and stylish, and the staff is always smiling and friendly.',
    evaluation: 4,
    likes: 4,
    dislikes: 0,
    createdAt: '2023-04-16',
  },
  {
    id: 3,
    user: {
      id: 53,
      name: 'Alisa',
      ava: 'image',
    },
    title: 'Cozy atmosphere',
    comment:
      'I love this coffee shop for its unique drinks and soulful atmosphere. I always find something new and delicious!',
    evaluation: 5,
    likes: 6,
    dislikes: 1,
    createdAt: '2023-01-13',
  },
];

type TWorkTime = {
  id: number;
  mon_open: string;
  mon_close: string;
  tue_open: string;
  tue_close: string;
  wed_open: string;
  wed_close: string;
  thu_open: string;
  thu_close: string;
  fri_open: string;
  fri_close: string;
  sat_open: string;
  sat_close: string;
  sun_open: string;
  sun_close: string;
};

type TCoffeeShopTag = {
  id: number;
  name: string;
  type: 'convenience' | 'activity';
};

type TCoffeeShopSocials = {
  id: number;
  [key: string]: string | number | undefined;
};

type TOwner = {
  id: number;
  username: string;
  email: string;
  is_owner: boolean;
  is_staff: boolean;
  first_name: string;
  last_name: string;
  photo: string;
};

type TCoffeeShopAddress = {
  city: string;
  postal_code: 94103;
  street: string;
};

type TCoffeeShop = {
  name: string;
  phone: string;
  image: null;
  description: string;
  work_time: TWorkTime;
  tags: TCoffeeShopTag[];
  socials: TCoffeeShopSocials;
  owner: TOwner;
  address: TCoffeeShopAddress;
};

const mockCoffeeShopData: TCoffeeShop = {
  name: 'Blue Bottle Coffee',
  phone: '415-555-1234',
  image: null,
  description: 'A great place for coffee and pastries.',
  work_time: {
    id: 1,
    mon_open: '08:00:00',
    mon_close: '18:00:00',
    tue_open: '08:00:00',
    tue_close: '18:00:00',
    wed_open: '08:00:00',
    wed_close: '18:00:00',
    thu_open: '08:00:00',
    thu_close: '18:00:00',
    fri_open: '08:00:00',
    fri_close: '18:00:00',
    sat_open: '09:00:00',
    sat_close: '17:00:00',
    sun_open: '09:00:00',
    sun_close: '15:00:00',
  },
  tags: [
    {
      id: 1,
      name: 'Wi-Fi',
      type: 'convenience',
    },
    {
      id: 2,
      name: 'Vegan Options',
      type: 'activity',
    },
  ],
  socials: {
    id: 1,
    instagram: 'https://instagram.com/bluebottle',
    facebook: 'https://facebook.com/bluebottle',
    twitter: 'https://twitter.com/bluebottle',
  },
  owner: {
    id: 1,
    username: 'john_doe',
    email: 'john.doe@example.com',
    is_owner: true,
    is_staff: true,
    first_name: 'John',
    last_name: 'Doe',
    photo: 'null',
  },
  address: {
    city: 'San Francisco',
    postal_code: 94103,
    street: '123 Mission St',
  },
};

// const title = 'Zakapelok';
const rating = '4.6';
const amountOfEvaluations = '234';
const openingTime = '08:00';
const closingTime = '22:00';

export const CoffeeShop = () => {
  const getCurrentHour = (): string => {
    const now = new Date();
    const hours = now.getHours();

    return hours.toString().padStart(2, '0') + ':00';
  };

  const currentHour = getCurrentHour();

  const isCoffeeShopOpen =
    currentHour > openingTime && currentHour < closingTime;

  const {
    name: title,
    phone,
    address: { city, street },
  } = mockCoffeeShopData;

  return (
    <main className="grow">
      <Container>
        <PageGrid>
          <div className="col-span-9 flex gap-4">
            <HeaderH1 extraClasses="inline-block text-secondary/100">
              {title}
            </HeaderH1>

            <p className="relative text-lg leading-[22px] text-gray/100 pt-[15px] pl-7 before:absolute before:block before:w-6 before:h-6 before:bg-primary/100 before:left-0 star">
              <span className="font-semibold text-2xl text-secondary/100 mr-1">
                {rating}
              </span>
              {`from ${amountOfEvaluations} reviews`}
            </p>
          </div>
          <TextBodyP extraClasses="col-span-3 pt-5 text-gray/100 text-right">
            Created by the owner
          </TextBodyP>

          <div className="col-span-3 flex items-center">
            <p className="relative font-semibold text-2xl text-success star-marker after:bg-secondary/100 after:absolute after:w-5 after:h-5 after:block after:right-[6px] after:top-[38%] after:translate-y-[-50%] pr-8">
              {isCoffeeShopOpen ? 'Open' : ' Close'}
            </p>
            <p className="text-2xl leading-[36px] text-secondary/100">
              {isCoffeeShopOpen
                ? `Closes at ${closingTime}`
                : `Opens at ${openingTime}`}
            </p>
          </div>
          <div className="flex justify-between w-full col-span-3 py-1">
            <TextBodyP>Working time</TextBodyP>
            <button>s</button>
          </div>
        </PageGrid>

        <div>currentHour = {currentHour}</div>

        <section className="mb-20">
          <SectionTitle>Details</SectionTitle>
          <PageGrid>
            <div className="col-span-3">
              <HeaderH3 extraClasses="mb-4">Pricing policy</HeaderH3>
              <TextBodyP>middle class</TextBodyP>
            </div>

            <div className="col-span-3">
              <HeaderH3 extraClasses="mb-4">Type</HeaderH3>
              <TextBodyP>Network coffee shop</TextBodyP>
            </div>

            <div className="col-span-3">
              <HeaderH3 extraClasses="mb-4">Activities</HeaderH3>
              <TextBodyP>1</TextBodyP>
            </div>

            <div className="col-span-3">
              <HeaderH3 extraClasses="mb-4">Conveniences</HeaderH3>
              <TextBodyP>2</TextBodyP>
            </div>
          </PageGrid>
        </section>

        <section className="mb-20">
          <SectionTitle>Contacts</SectionTitle>
          <PageGrid>
            <div className="col-span-3">
              <div className="mb-[24px]">
                <HeaderH3 extraClasses="mb-4">Tel.</HeaderH3>
                <TextBodyP>{phone}</TextBodyP>
              </div>
              <div className="mb-[24px]">
                <HeaderH3 extraClasses="mb-4">Email</HeaderH3>
                <TextBodyP>email@email.com</TextBodyP>
              </div>
              <div>
                <HeaderH3 extraClasses="mb-4">Website</HeaderH3>
                <TextBodyP>website.com</TextBodyP>
              </div>
            </div>

            <div className="col-span-3">
              <div className="mb-[24px]">
                <HeaderH3 extraClasses="mb-4">Address</HeaderH3>
                <TextBodyP extraClasses="mb-2">{city}</TextBodyP>
                <TextBodyP extraClasses="mb-2">district</TextBodyP>
                <TextBodyP>{street}</TextBodyP>
              </div>
              <div>
                <HeaderH3 extraClasses="mb-4">Social</HeaderH3>
                <ul className="flex gap-6">
                  <li>
                    <a href="#">
                      <span
                        style={{
                          maskImage: `url(${twitterIcon})`,
                          maskSize: 'cover',
                          maskRepeat: 'no-repeat',
                        }}
                        className="block w-11 h-11 bg-primary/100"
                      ></span>
                    </a>
                  </li>

                  <li>
                    <a href="#">
                      <span
                        style={{
                          maskImage: `url(${facebookIcon})`,
                          maskSize: 'cover',
                          maskRepeat: 'no-repeat',
                        }}
                        className="block w-11 h-11 bg-primary/100"
                      ></span>
                    </a>
                  </li>

                  <li>
                    <a href="#">
                      <span
                        style={{
                          maskImage: `url(${instagramIcon})`,
                          maskSize: 'cover',
                          maskRepeat: 'no-repeat',
                        }}
                        className="block w-11 h-11 bg-primary/100"
                      ></span>
                    </a>
                  </li>
                </ul>
              </div>
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
        </section>

        <section className="mb-20">
          <div className="flex justify-between">
            <SectionTitle>Reviews</SectionTitle>
            <Button
              text="Add review"
              type="button"
              appearance="primary"
              icon="plus"
            />
          </div>
          <ul className="flex flex-col gap-4">
            {mockComments.map(commentItem => {
              const {
                id,
                createdAt,
                user: { name },
                title: commentTitle,
                evaluation,
                comment,
                likes,
                dislikes,
              } = commentItem;

              return (
                <li key={id}>
                  <CommentCard
                    name={name}
                    createdAt={createdAt}
                    title={commentTitle}
                    evaluation={evaluation}
                    comment={comment}
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
