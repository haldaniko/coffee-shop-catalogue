/* eslint-disable max-len */
type Props = {
  children: React.ReactNode;
  asTag: 'span' | 'p';
  extraClasses?: string;
};

export const FieldTitle: React.FC<Props> = ({
  children,
  asTag,
  extraClasses = '',
}) => {
  const Tag = asTag;

  return (
    <Tag
      className={`inline-block text-[18px] leading-[22px] text-secondary/100 mb-[8px] ${extraClasses}`}
    >
      {children}
    </Tag>
  );
};
