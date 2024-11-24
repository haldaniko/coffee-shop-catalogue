/* eslint-disable max-len */
type Props = {
  children: React.ReactNode;
  extraClasses?: string;
};

export const Frame: React.FC<Props> = ({ children, extraClasses = '' }) => {
  return (
    <div
      className={`bg-background/100 border border-primary/100 rounded-lg p-4 ${extraClasses}`}
    >
      {children}
    </div>
  );
};
