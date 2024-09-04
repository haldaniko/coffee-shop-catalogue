/* eslint-disable max-len */
import { PageGrid } from '../../shared/components/PageGrid';
import { HeaderH1 } from '../../shared/components/typography/HeaderH1';
import emailIcon from '../../assets/icons/email-with-at.svg';
import { Logo } from '../../shared/components/Logo';

export const CheckEmailPage = () => {
  return (
    <section className="pt-[14px]">
      <div className="container">
        <Logo />
        <PageGrid>
          <div className="col-span-6 col-start-4 flex flex-col items-center -mt-[20px]">
            <HeaderH1 extraClasses="text-secondary/100 mb-[16px]">
              Check your mail
            </HeaderH1>
            <p className="font-primary text-[18px] leading-[120%] text-gray/100 mb-10">
              We have sent a password recover instructions to your email.
            </p>
            <div className="mb-10">
              <span
                style={{
                  maskImage: `url(${emailIcon})`,
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                }}
                className="block w-[124px] h-[124px] bg-primary/100"
              ></span>
            </div>
            <a
              href="#"
              className="flex justify-center w-full rounded-lg bg-primary/100 py-2 mb-8"
            >
              <span className="font-primary font-semibold text-[18px] leading-[27px] text-secondary/100">
                Open email app
              </span>
            </a>
            <p className="font-primary text-[18px] leading-[120%] text-secondary/100 text-center mb-10">
              Did not receive the email? Check your spam <br /> folder or try
              another email address
            </p>
          </div>
        </PageGrid>
      </div>
    </section>
  );
};
