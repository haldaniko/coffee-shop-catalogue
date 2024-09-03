import { HeroBadges } from '../../../shared/types/HeroBadges';

/* eslint-disable max-len */
type Props = {
  title: keyof typeof HeroBadges;
  value: number;
};

export const HeroBadge: React.FC<Props> = ({ title, value }) => {
  return (
    <>
      <span className="font-primary font-bold text-4xl leading-[48px] text-background/100 mb-1">
        {value}
      </span>
      <p className="font-primary font-medium text-[18px] leading-[24px] text-background/100">
        {HeroBadges[title]}
      </p>
    </>
  );
};
