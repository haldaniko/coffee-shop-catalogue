type Props = {
  children: React.ReactNode;
  extraClasses?: string;
};

export const PageGrid: React.FC<Props> = ({ children, extraClasses = '' }) => {
  return (
    <div className={`w-full grid grid-cols-12 gap-4 ${extraClasses}`}>
      {children}
    </div>
  );
};
