/* eslint-disable max-len */
type Props = {
  children: React.ReactNode;
  extraClasses?: string;
};

export const HeaderH1: React.FC<Props> = ({ children, extraClasses = '' }) => {
  return (
    <h1
      className={`font-primary text-[54px] font-bold leading-[120%] ${extraClasses}`}
    >
      {children}
    </h1>
  );
};
