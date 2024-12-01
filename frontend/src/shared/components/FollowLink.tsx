type Props = {
  children: React.ReactNode;
  appearance: 'primary' | 'secondary' | 'borderless';
  linkTo: string;
  full?: boolean;
  second?: boolean;
  extraClasses?: string;
};

export const FollowLink: React.FC<Props> = ({
  children,
  appearance,
  linkTo,
  full,
  second,
  extraClasses = '',
}) => {
  const general = `flex p-[6px] border-2 border-primary/100 rounded-lg ${full && 'w-full justify-center'} ${extraClasses} transition duration-300 ease-in-out`;
  const text = 'font-semibold text-[18px] leading-[27px]';

  const primaryText = `text-secondary/100 ${text}`;
  const primaryHover = `hover:bg-focused/100 hover:border-focused/100 hover:transition hover:duration-300 hover:ease-in-out`;
  const primary = `bg-primary/100 ${general} ${primaryText} ${primaryHover}`;

  const secondaryText = `text-secondary/100 ${text}`;
  const secondaryHover = 'hover:border-focused/100 hover:bg-focused/100';
  const secondary = `${general} ${secondaryText} ${secondaryHover}`;

  const borderlessColor = `${second ? 'primary/100' : 'secondary/100'}`;
  const borderlessText = `${text} text-${borderlessColor}`;
  const underline = `after:absolute after:content-[''] after:block after:h-[2px] after:w-full after:bottom-0 after:opacity-0 after:transition-[opacity, bottom] after:duration-300 after:ease-in-out`;
  const borderlessHover = `${underline} hover:text-${borderlessColor} hover:after:bottom-2 hover:after:opacity-100 hover:after:transition-[opacity, bottom] hover:after:duration-300 hover:after:ease-in-out after:bg-${borderlessColor}`;
  const borderless = `inline-block py-[6px] mx-2 rounded-lg ${borderlessText} relative ${borderlessHover}`;

  let styles = '';

  switch (appearance) {
    case 'primary':
      styles += primary;
      break;
    case 'secondary':
      styles += secondary;
      break;
    case 'borderless':
      styles += borderless;
      break;
    default:
      break;
  }

  return (
    <a href={linkTo} className={styles}>
      {children}
    </a>
  );
};
