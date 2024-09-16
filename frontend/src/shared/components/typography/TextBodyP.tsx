type Props = {
  children: React.ReactNode;
  extraClasses?: string;
};

export const TextBodyP: React.FC<Props> = ({ children, extraClasses = '' }) => {
  return <p className={`text-lg leading-[22px] ${extraClasses}`}>{children}</p>;
};
