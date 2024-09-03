/* eslint-disable max-len */
import DOMPurify from 'dompurify';
import searchCoffeeIcon from '../../../assets/icons/search-coffee.svg';

type Props = {
  map: string | undefined;
};

export const HeroMap: React.FC<Props> = ({ map = '' }) => {
  return (
    <div className="relative">
      <div
        className="fill-background/100"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(map),
        }}
      />

      <div
        className="fill-none stroke-primary/100 stroke-2 absolute w-[95%] h-[95%] start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(map),
        }}
      />

      <span
        style={{ maskImage: `url(${searchCoffeeIcon})` }}
        className="flex w-7 h-7 absolute bg-secondary/100 inset-1/2"
      ></span>
    </div>
  );
};
