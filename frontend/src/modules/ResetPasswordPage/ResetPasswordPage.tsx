/* eslint-disable max-len */
import { Button } from '../../shared/components/Button';
import { Logo } from '../../shared/components/Logo';
import { PageGrid } from '../../shared/components/PageGrid';
import { HeaderH1 } from '../../shared/components/typography/HeaderH1';

export const ResetPasswordPage = () => {
  return (
    <section className="pt-[14px]">
      <div className="container">
        <Logo />
        <PageGrid>
          <div className="col-span-6 col-start-4 -mt-[20px]">
            <HeaderH1 extraClasses="text-secondary/100 text-center mb-[16px]">
              Password reset
            </HeaderH1>
            <p className="font-primary text-[18px] leading-[22px] text-center text-gray/100 mb-10">
              Enter the email associated with your account and we&apos;ll send
              to email <br /> with instruction to reset your password.
            </p>
            <form className="flex flex-col">
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
              <div className="flex gap-2 mb-8">
                <input type="checkbox" id="robot" name="robot" />
                <label
                  htmlFor="robot"
                  className="font-primary text-[16px] leading-[26px] text-secondary/100 py-[7px]"
                >
                  I’m not a robot
                </label>
              </div>
              <Button
                text="Send instruction"
                type="submit"
                appearance="primary-full"
              />
            </form>
          </div>
        </PageGrid>
      </div>
    </section>
  );
};
