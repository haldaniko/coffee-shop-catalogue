/* eslint-disable max-len */
import { CardTitle } from './typography/CardTitle';
import { FollowLink } from './FollowLink';
import heartIcon from '../../assets/icons/heart.svg';
import starIcon from '../../assets/icons/star.svg';
import uahIcon from '../../assets/icons/uah.svg';
import { CoffeeShopAddress } from '../types/CoffeeShopAddress';

type Props = {
  id: number;
  image: string | null;
  title: string;
  address: CoffeeShopAddress;
  rating: number | null;
  price: number;
};

export const CoffeeShopCard: React.FC<Props> = ({
  id,
  image,
  title,
  address,
  rating,
  price,
}) => {
  return (
    <article className="h-full flex flex-col gap-6 p-4 border border-primary/100 rounded-lg bg-background/100">
      <div className="relative rounded overflow-hidden">
        <div className="absolute flex items-center justify-center rounded-bl w-10 h-8 bg-secondary/100 right-0">
          <span
            style={{ maskImage: `url(${heartIcon})` }}
            className="block w-6 h-6 bg-background/100 hover:cursor-pointer"
          ></span>
        </div>

        <a
          href={`/coffee-shop/${id}`}
          className="flex h-[236px] bg-default/100"
        >
          {image && (
            <img
              // The image can't be fetched from the server
              // src={`http://localhost:8000${image}`}
              src={image}
              alt=""
              className="w-full object-cover"
            />
          )}
        </a>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <CardTitle>{title}</CardTitle>
          <div className="flex gap-2 font-primary text-[24px] leading-[32px] font-semibold text-secondary/100">
            <span
              style={{ maskImage: `url(${starIcon})` }}
              className="flex w-6 h-6 bg-primary/100"
            ></span>
            {rating}
          </div>
        </div>
        <p className="font-primary font-medium text-lg leading-[24px] text-gray/100 mb-2">
          {address.street}
        </p>
        <p className="flex font-primary text-[24px] leading-[32px] font-semibold text-secondary/100">
          {[...Array(price + 1)].map((_, index) => {
            return (
              <span
                key={index}
                style={{
                  maskImage: `url(${uahIcon})`,
                  maskRepeat: 'no-repeat',
                  maskSize: 'contain',
                  maskPosition: 'center',
                }}
                className="flex w-[14px] h-8 bg-secondary/100"
              ></span>
            );
          })}
        </p>
      </div>

      <FollowLink
        appearance="secondary"
        full
        linkTo={`/coffee-shop/${id}`}
        extraClasses="mt-auto"
      >
        See more
      </FollowLink>
    </article>
  );
};
