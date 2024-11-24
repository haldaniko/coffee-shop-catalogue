/* eslint-disable max-len */
type Props = {
  children: React.ReactNode;
  extraClasses?: string;
};

export const HeaderH4: React.FC<Props> = ({ children, extraClasses = '' }) => {
  return (
    <h4 className={`font-semibold text-2xl text-secondary/100 ${extraClasses}`}>
      {children}
    </h4>
  );
};
