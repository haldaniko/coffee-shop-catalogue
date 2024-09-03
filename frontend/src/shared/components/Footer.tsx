/* eslint-disable max-len */
import { Logo } from './Logo';
import twitterIcon from '../../assets/icons/twitter.svg';
import facebookIcon from '../../assets/icons/facebook.svg';
import instagramIcon from '../../assets/icons/instagram.svg';

export const Footer = () => {
  return (
    <section className="flex flex-col">
      <div className="flex justify-between mb-10">
        <Logo />
        <ul className="grid grid-cols-2 gap-4 font-primary font-semibold text-[24px] leading-[32px] text-gray/100">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Support</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Concellation Options</a>
          </li>
          <li>
            <a href="#">Contacts</a>
          </li>
          <li>
            <a href="#">Report</a>
          </li>
        </ul>
      </div>

      <div className="flex justify-between items-end mb-[60px]">
        <p className="font-primary text-[18px] leading-[22px] text-secondary/100">
          Copyright © 2024. All Rights Reserved.
        </p>

        <ul className="flex gap-6">
          <li>
            <a href="#">
              <span
                style={{
                  maskImage: `url(${twitterIcon})`,
                  maskSize: 'cover',
                  maskRepeat: 'no-repeat',
                }}
                className="block w-11 h-11 bg-primary/100"
              ></span>
            </a>
          </li>

          <li>
            <a href="#">
              <span
                style={{
                  maskImage: `url(${facebookIcon})`,
                  maskSize: 'cover',
                  maskRepeat: 'no-repeat',
                }}
                className="block w-11 h-11 bg-primary/100"
              ></span>
            </a>
          </li>

          <li>
            <a href="#">
              <span
                style={{
                  maskImage: `url(${instagramIcon})`,
                  maskSize: 'cover',
                  maskRepeat: 'no-repeat',
                }}
                className="block w-11 h-11 bg-primary/100"
              ></span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};
