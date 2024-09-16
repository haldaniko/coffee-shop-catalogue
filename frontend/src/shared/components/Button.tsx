/* eslint-disable max-len */
import filter from '../../assets/icons/filter.svg';
import search from '../../assets/icons/search.svg';
import plus from '../../assets/icons/plus.svg';

type Props = {
  text: string;
  type: 'submit' | 'reset' | 'button';
  appearance: 'primary' | 'primary-full' | 'secondary' | 'secondary-light';
  icon?: string;
  action?: () => void | undefined;
};

export const Button: React.FC<Props> = ({
  text,
  type,
  appearance,
  icon,
  action = () => {},
}) => {
  const general =
    'px-4 py-2 flex gap-2 items-center rounded-lg border-2 text-xl leading-[27px] font-primary h-fit';
  const primary = `${general} bg-primary/100 border-primary/100 font-semibold text-secondary/100`;
  const primaryFull = `${primary} w-full justify-center`;
  const secondary = `${general} border-primary/100 text-secondary/100`;
  const secondaryLight = `${general} border-background/100 text-background/100`;
  const textStyle = '';
  const selectedIcon: { [index: string]: string } = {
    filter: `url(${filter})`,
    search: `url(${search})`,
    plus: `url(${plus})`,
  };

  let buttonStyle = '';

  switch (appearance) {
    case 'primary':
      buttonStyle += primary;
      break;
    case 'primary-full':
      buttonStyle += primaryFull;
      break;
    case 'secondary':
      buttonStyle += secondary;
      break;
    case 'secondary-light':
      buttonStyle += secondaryLight;
      break;
    default:
      break;
  }

  return (
    <button type={type} className={buttonStyle} onClick={action}>
      {icon && (
        <span
          style={{ maskImage: selectedIcon[icon] }}
          className={`w-6 h-6 ${appearance === 'primary' ? 'bg-secondary/100' : 'bg-background/100'}`}
        ></span>
      )}
      <span className={textStyle}>{text}</span>
    </button>
  );
};
