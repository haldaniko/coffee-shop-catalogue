type Props = {
  children: React.ReactNode;
  appearance: 'primary' | 'primary-full' | 'secondary';
  linkTo: string;
  extraClasses?: string;
};

export const FollowLink: React.FC<Props> = ({
  children,
  appearance,
  linkTo,
  extraClasses = '',
}) => {
  const styleGeneral = `flex p-[6px] border-2 border-primary/100 rounded-lg ${extraClasses}`;
  const styleText =
    'font-primary font-semibold text-[18px] leading-[27px] text-secondary/100';
  const stylePrimary = `${styleGeneral} ${styleText} bg-primary/100`;
  const stylePrimaryFull = `${stylePrimary} w-full justify-center`;
  const styleSecondary = `${styleGeneral} ${styleText}`;

  let styleLink = '';

  switch (appearance) {
    case 'primary':
      styleLink += stylePrimary;
      break;
    case 'primary-full':
      styleLink += stylePrimaryFull;
      break;
    case 'secondary':
      styleLink += styleSecondary;
      break;
    default:
      break;
  }

  return (
    <a href={linkTo} className={styleLink}>
      {children}
    </a>
  );
};
