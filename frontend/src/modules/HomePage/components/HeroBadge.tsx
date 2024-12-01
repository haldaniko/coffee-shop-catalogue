import { HeroBadges } from '../../../shared/types/HeroBadges';

/* eslint-disable max-len */
type Props = {
  title: keyof typeof HeroBadges;
  value: number;
};

export const HeroBadge: React.FC<Props> = ({ title, value }) => {
  return (
    <>
      <span className="font-bold text-[40px] leading-[48px] text-background/100 mb-1">
        {value || '0'}
      </span>
      <p className="font-medium text-lg leading-6 text-background/100">
        {HeroBadges[title]}
      </p>
    </>
  );
};
