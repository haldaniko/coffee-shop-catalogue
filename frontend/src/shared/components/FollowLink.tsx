type Props = {
  children: React.ReactNode;
  type: 'primary' | 'secondary';
  linkTo: string;
  extraClasses?: string;
};

export const FollowLink: React.FC<Props> = ({
  children,
  type,
  linkTo,
  extraClasses = '',
}) => {
  const styleGeneral = `flex p-[6px] border-2 border-primary/100 rounded-lg ${extraClasses}`;
  const styleText =
    'font-primary font-semibold text-[18px] leading-[27px] text-secondary/100';
  const stylePrimary = `${styleGeneral} ${styleText} bg-primary/100`;
  const styleSecondary = `${styleGeneral} ${styleText}`;

  return (
    <a
      href={linkTo}
      className={type === 'primary' ? stylePrimary : styleSecondary}
    >
      {children}
    </a>
  );
};
