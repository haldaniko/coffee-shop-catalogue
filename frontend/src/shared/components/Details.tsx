/* eslint-disable max-len */
import classNames from 'classnames';
import { HeaderH3 } from './typography/HeaderH3';
import arrowIcon from '../../assets/icons/arrow.svg';
import starMarkerIcon from '../../assets/icons/star-marker.svg';

type IsOpened = {
  [key: string]: boolean;
};

type Props = {
  isOpen: IsOpened;
  setIsOpen: React.Dispatch<React.SetStateAction<IsOpened>>;
  name: string;
  redLineStar?: boolean;
  primary?: boolean;
  title: string;
  children: React.ReactNode;
  extraClasses?: string;
};

export const Details: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  name,
  title,
  redLineStar,
  primary,
  children,
  extraClasses = '',
}) => {
  return (
    <details
      className={classNames(
        `border-2 rounded-lg border-primary/100 dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 ${extraClasses}`,
        {
          'p-4': primary,
          'p-2': !primary,
        },
      )}
    >
      <summary
        onClick={() =>
          setIsOpen(prevState => ({
            ...prevState,
            [name]: !prevState[name],
          }))
        }
        className="list-none select-none cursor-pointer outline-none"
      >
        <div className="flex justify-between items-center">
          {primary ? (
            <HeaderH3>{title}</HeaderH3>
          ) : (
            <h6 className="text-lg leading-[22px]">{title}</h6>
          )}
          <span
            style={{ maskImage: `url(${arrowIcon})` }}
            className={classNames('block w-6 h-6 bg-primary/100', {
              '-rotate-90': isOpen[name],
              'rotate-90': !isOpen[name],
            })}
          ></span>
        </div>
      </summary>

      <div className="relative pt-4 font-primary text-[24px] leading-[36px] text-secondary/100">
        {redLineStar && (
          <span
            style={{
              maskImage: `url(${starMarkerIcon})`,
              maskSize: 'cover',
              maskRepeat: 'no-repeat',
            }}
            className="absolute left-0 top-[22px] block w-5 h-5 bg-primary/100"
          ></span>
        )}
        {children}
      </div>
    </details>
  );
};
