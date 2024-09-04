/* eslint-disable max-len */
import { PageGrid } from '../../shared/components/PageGrid';
import { HeaderH1 } from '../../shared/components/typography/HeaderH1';
import googleIcon from '../../assets/icons/google.svg';
import facebookIcon from '../../assets/icons/facebook.svg';
import { Button } from '../../shared/components/Button';
import { Logo } from '../../shared/components/Logo';

export const RegistrationPage = () => {
  return (
    <section className="pt-[14px]">
      <div className="container">
        <Logo />
        <PageGrid>
          <div className="col-span-6 col-start-4 -mt-[20px]">
            <HeaderH1 extraClasses="text-secondary/100 text-center mb-10">
              Sign up
            </HeaderH1>
            <form className="flex flex-col">
              <label
                htmlFor="name"
                className="font-primary text-[18px] leading-[22px] text-secondary/100 mb-[8px]"
              >
                Enter your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                className="border border-default/100 rounded-lg bg-gray/10 px-[8px] py-[10px] placeholder:text-[18px] placeholder:leading-[22px] placeholder:text-gray/100 mb-[16px]"
              />
              <label
                htmlFor="email"
                className="font-primary text-[18px] leading-[22px] text-secondary/100 mb-[8px]"
              >
                Enter your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="border border-default/100 rounded-lg bg-gray/10 px-[8px] py-[10px] placeholder:text-[18px] placeholder:leading-[22px] placeholder:text-gray/100 mb-[16px]"
              />
              <label
                htmlFor="password"
                className="font-primary text-[18px] leading-[22px] text-secondary/100 mb-[8px]"
              >
                Enter your password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="border border-default/100 rounded-lg bg-gray/10 px-[8px] py-[10px] placeholder:text-[18px] placeholder:leading-[22px] placeholder:text-gray/100 mb-[32px]"
              />
              <Button text="Sing up" type="submit" appearance="primary-full" />
            </form>
            <div className="flex relative py-8">
              <div className="h-[1px] my-auto bg-gray/100 grow"></div>
              <span className="font-primary text-[18px] leading-[27px] text-gray/100 px-2">
                or
              </span>
              <div className="h-[1px] my-auto bg-gray/100 grow"></div>
            </div>
            <button className="border border-primary/100 rounded-lg flex w-full justify-center gap-2 py-2 mb-4">
              <span
                style={{
                  maskImage: `url(${googleIcon})`,
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                }}
                className="w-6 h-6 bg-primary/100"
              ></span>
              <span className="font-primary font-semibold text-[18px] leading-[150%] text-primary/100">
                Continue with Google
              </span>
            </button>
            <button className="border border-primary/100 rounded-lg flex w-full justify-center gap-2 py-2 mb-4">
              <span
                style={{
                  maskImage: `url(${facebookIcon})`,
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                }}
                className="w-6 h-6 bg-primary/100"
              ></span>
              <span className="font-primary font-semibold text-[18px] leading-[150%] text-primary/100">
                Continue with Facebook
              </span>
            </button>
            <div className="flex justify-between mb-8">
              <p className="font-primary text-4 leading-[150%] text-secondary/100">
                Have an account?
              </p>
              <a
                href="#"
                className="font-primary font-semibold text-[16px] leading-[150%] text-primary/100"
              >
                Sign in
              </a>
            </div>
          </div>
        </PageGrid>
      </div>
    </section>
  );
};
