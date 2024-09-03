/* eslint-disable max-len */
import coffeeBeanSVG from '../../assets/icons/coffee-bean.svg';

type Props = {
  extraClasses: string;
};

export const Bean: React.FC<Props> = ({ extraClasses }) => {
  return (
    <svg className={`fill-none w-full h-full ${extraClasses}`}>
      <use href={`${coffeeBeanSVG}#coffee-bean`} />
    </svg>
  );
};
