/* eslint-disable max-len */
import { CardTitle } from './typography/CardTitle';
import { FollowLink } from './FollowLink';
import heartIcon from '../../assets/icons/heart.svg';
import starIcon from '../../assets/icons/star.svg';
import uahIcon from '../../assets/icons/uah.svg';

type Props = {
  image: string;
  title: string;
  address: string;
  rating: number;
  price: number;
};

export const CoffeeShopCard: React.FC<Props> = ({
  image,
  title,
  address,
  rating,
  price,
}) => {
  return (
    <article className="p-4 border border-primary/100 rounded-lg bg-background/100">
      <div className="relative rounded overflow-hidden mb-[24px]">
        <div className="absolute flex items-center justify-center rounded-bl w-10 h-8 bg-secondary/100 right-0">
          <span
            style={{ maskImage: `url(${heartIcon})` }}
            className="block w-6 h-6 bg-background/100"
          ></span>
        </div>

        <a href="#" className="flex h-[236px]">
          <img src={image} alt="" className="w-full object-cover" />
        </a>
      </div>

      <div className="flex justify-between mb-1">
        <CardTitle>{title}</CardTitle>

        <div className="flex gap-2 items-center font-primary text-[24px] leading-[32px] font-semibold text-secondary/100">
          <span
            style={{ maskImage: `url(${starIcon})` }}
            className="flex w-6 h-6 bg-primary/100"
          ></span>
          {rating}
        </div>
      </div>

      <p className="font-primary text-[18px] leading-[22px] text-gray/100 mb-4">
        {address}
      </p>
      <p className="flex font-primary text-[24px] leading-[32px] font-semibold text-secondary/100 mb-[32px]">
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

      <FollowLink
        type="secondary"
        linkTo="#"
        extraClasses="w-full justify-center"
      >
        See more
      </FollowLink>
    </article>
  );
};
