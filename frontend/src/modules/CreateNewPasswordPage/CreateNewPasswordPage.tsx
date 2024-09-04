/* eslint-disable max-len */
import { Button } from '../../shared/components/Button';
import { Logo } from '../../shared/components/Logo';
import { PageGrid } from '../../shared/components/PageGrid';
import { HeaderH1 } from '../../shared/components/typography/HeaderH1';

export const CreateNewPasswordPage = () => {
  return (
    <section className="pt-[14px]">
      <div className="container">
        <Logo />
        <PageGrid>
          <div className="col-span-6 col-start-4 -mt-[20px]">
            <HeaderH1 extraClasses="text-secondary/100 text-center mb-[16px]">
              Create new password
            </HeaderH1>
            <p className="font-primary text-[18px] leading-[120%] text-center text-gray/100 mb-10">
              Your new password must be different from any previously used one
              to increase the security of your data
            </p>
            <form className="flex flex-col">
              <label
                htmlFor="password"
                className="font-primary text-[18px] leading-[22px] text-secondary/100 mb-[8px]"
              >
                Create password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                placeholder="Must be at least 8 character"
                className="border border-default/100 rounded-lg bg-gray/10 px-[8px] py-[10px] placeholder:text-[18px] placeholder:leading-[22px] placeholder:text-gray/100 mb-[16px]"
              />
              <label
                htmlFor="confirmedPassword"
                className="font-primary text-[18px] leading-[22px] text-secondary/100 mb-[8px]"
              >
                Confirm password
              </label>
              <input
                type="text"
                id="confirmedPassword"
                name="confirmedPassword"
                placeholder="Both password must match"
                className="border border-default/100 rounded-lg bg-gray/10 px-[8px] py-[10px] placeholder:text-[18px] placeholder:leading-[22px] placeholder:text-gray/100 mb-8"
              />
              <Button
                text="Reset password"
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
