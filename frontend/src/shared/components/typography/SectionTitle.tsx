type Props = {
  children: React.ReactNode;
  extraClasses?: string;
};

export const SectionTitle: React.FC<Props> = ({
  children,
  extraClasses = '',
}) => {
  return (
    <h2
      className={`font-primary text-[40px] leading-[48px] font-bold text-secondary/100 mb-10 ${extraClasses}`}
    >
      {children}
    </h2>
  );
};
