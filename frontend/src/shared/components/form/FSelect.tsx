/* eslint-disable max-len */
import classNames from 'classnames';
import arrowIcon from '../../../assets/icons/arrow.svg';
import { SelectOption } from '../../types/SelectOption';
import { useEffect, useRef, useState } from 'react';

type Props = {
  value?: SelectOption;
  options: SelectOption[];
  onChange: (value: SelectOption | undefined) => void;
};

export const FSelect: React.FC<Props> = ({ value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOption = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    option: SelectOption,
  ) => {
    e.stopPropagation();

    if (option !== value) {
      onChange(option);
    }

    setIsOpen(false);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) {
        return;
      }

      switch (e.key) {
        case 'Enter':
        case 'Space':
          e.preventDefault();
          // eslint-disable-next-line no-console
          console.log(e.key);

          setIsOpen(prev => !prev);

          break;
        case 'ArrowUp':
        case 'ArrowDown':
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          break;
        default:
          break;
      }
    };

    containerRef.current?.addEventListener('keydown', handler);

    return () => {
      containerRef.current?.removeEventListener('keydown', handler);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="relative w-full flex items-center gap-2 py-[10px] px-2 rounded-lg bg-gray/10 border border-primary/100 outline-none focus:border-2"
      onClick={() => setIsOpen(prev => !prev)}
      // onKeyDown={e => {
      //   if (e.key === 'Enter') {
      //     setIsOpen(prev => !prev);
      //   }

      //   // eslint-disable-next-line no-console
      //   console.log(e);
      // }}
      onBlur={() => setIsOpen(false)}
    >
      <span className="grow">{value?.label || 'Select city'}</span>

      <span
        style={{ maskImage: `url(${arrowIcon})` }}
        className={classNames('flex w-6 h-6 bg-primary/100 cursor-pointer', {
          '-rotate-90': isOpen,
          'rotate-90': !isOpen,
        })}
      ></span>

      {isOpen && (
        <ul className="absolute z-50 flex flex-col top-[120%] left-0 w-full gap-2 py-4 rounded-lg bg-gray/10 border border-primary/100 overflow-y-auto">
          {options.map(option => (
            <li
              key={option.label}
              className={classNames('p-2 hover:bg-focused/100 cursor-pointer', {
                'bg-primary/100 pointer-events-none':
                  option.label === value?.label,
              })}
              onClick={e => handleOption(e, option)}
            >
              <span className="font-primary text-[18px] leading-[22px] text-secondary/100">
                {option.label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
