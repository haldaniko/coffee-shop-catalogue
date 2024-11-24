/* eslint-disable max-len */
// import DOMPurify from 'dompurify';
import searchCoffeeIcon from '../../../assets/icons/search-coffee.svg';
import { SEARCH_ICON_POSITION, VIEWBOX } from '../constants/HeroMapConstants';

type Props = {
  city: string | undefined;
  map: string | undefined;
};

export const HeroMap: React.FC<Props> = ({ city = 'Kyiv', map = '' }) => {
  return (
    <div className="relative">
      <svg
        className="fill-background/100"
        viewBox={VIEWBOX[city]}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={map} />
      </svg>

      <svg
        className="fill-none stroke-primary/100 stroke-2 absolute w-[95%] h-[95%] start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        viewBox={VIEWBOX[city]}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={map} />
      </svg>

      <span
        style={{ maskImage: `url(${searchCoffeeIcon})` }}
        className={`flex w-7 h-7 absolute bg-secondary/100 ${SEARCH_ICON_POSITION[city]}`}
      ></span>
    </div>
  );
};
