/* eslint-disable max-len */
import twitterIcon from '../../../assets/icons/twitter.svg';
import facebookIcon from '../../../assets/icons/facebook.svg';
import instagramIcon from '../../../assets/icons/instagram.svg';
import { Socials } from '../../../shared/types/coffeeShop/Social';

const URLS: Omit<Socials, 'id'> = {
  twitter: `url(${twitterIcon})`,
  instagram: `url(${instagramIcon})`,
  facebook: `url(${facebookIcon})`,
};

type Props = {
  to: string;
  network: string;
  extraClasses?: string;
};

export const SocialLink: React.FC<Props> = ({
  to = '#',
  network,
  extraClasses = '',
}) => {
  return (
    <a href={to} className={`${extraClasses}`}>
      <span
        style={{
          maskImage: URLS[network] as string,
          maskSize: 'cover',
          maskRepeat: 'no-repeat',
        }}
        className="block w-11 h-11 bg-primary/100"
      ></span>
    </a>
  );
};
