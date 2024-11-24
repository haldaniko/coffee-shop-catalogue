import filter from '../../assets/icons/filter.svg';
import search from '../../assets/icons/search.svg';
import plus from '../../assets/icons/plus.svg';
import classNames from 'classnames';

type Props = {
  children: React.ReactNode;
  type: 'submit' | 'reset' | 'button';
  appearance: 'primary' | 'secondary';
  full?: boolean;
  second?: boolean;
  icon?: string;
  action?: () => void | undefined;
};

export const Button: React.FC<Props> = ({
  children,
  type,
  appearance,
  full,
  second,
  icon,
  action = () => {},
}) => {
  const general = `px-4 py-2 flex gap-2 items-center rounded-lg border-2 h-fit group ${full && 'w-full justify-center'}`;
  const text = `text-xl leading-[27px]`;

  const primaryText = `font-semibold text-secondary/100 ${text}`;
  const primaryHover = `hover:border-focused/100 hover:bg-focused/100`;
  const primary = `bg-primary/100 border-primary/100 ${primaryText} ${general} ${primaryHover}`;

  const secondaryTextColor = `${second ? 'background/100' : 'secondary/100'}`;
  const secondaryText = `text-${secondaryTextColor} ${text}`;
  const secondaryHoverColor = `${second ? 'primary/100' : 'focused/100'}`;
  const secondaryHover = `hover:border-${secondaryHoverColor} hover:bg-${secondaryHoverColor} ${second && `hover:text-${secondaryHoverColor}`}`;
  const secondaryBorderColor = `${second ? 'background/100' : 'primary/100'}`;
  const secondary = `border-${secondaryBorderColor} ${secondaryText} ${general} ${secondaryHover}`;

  const selectedIcon: { [index: string]: string } = {
    filter: `url(${filter})`,
    search: `url(${search})`,
    plus: `url(${plus})`,
  };

  let styles = '';

  switch (appearance) {
    case 'primary':
      styles += primary;
      break;
    case 'secondary':
      styles += secondary;
      break;
    default:
      break;
  }

  return (
    <button type={type} className={styles} onClick={action}>
      {icon && (
        <span
          style={{ maskImage: selectedIcon[icon] }}
          className={classNames('w-6 h-6', {
            'bg-secondary/100': appearance === 'primary',
            'bg-background/100': appearance !== 'primary',
            'group-hover:bg-primary/100': appearance === 'secondary' && second,
          })}
        ></span>
      )}
      <span>{children}</span>
    </button>
  );
};
