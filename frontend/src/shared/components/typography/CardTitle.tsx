type Props = {
  children: React.ReactNode;
  extraClasses?: string;
};

export const CardTitle: React.FC<Props> = ({ children, extraClasses = '' }) => {
  return (
    <h3
      className={`font-primary font-semibold text-[32px] leading-[43px] text-secondary/100 ${extraClasses}`}
    >
      {children}
    </h3>
  );
};
