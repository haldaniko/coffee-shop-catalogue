/* eslint-disable max-len */
import { useRouteError } from 'react-router-dom';
import { Navbar } from '../../shared/components/Navbar';
import { PageGrid } from '../../shared/components/PageGrid';
import notFoundImage from '../../assets/images/404.png';
import { FollowLink } from '../../shared/components/FollowLink';

interface RouteError {
  status?: number;
  statusText?: string;
  message?: string;
}

export const NotFoundPage = () => {
  const error = useRouteError() as RouteError;

  return (
    <>
      <div className="container">
        <Navbar />
        <main>
          <section>
            <PageGrid>
              <div className="col-span-4 col-start-5">
                <img src={notFoundImage} alt="" className="w-full mb-4" />
              </div>
              <div className="col-span-6 col-start-4 flex flex-col items-center">
                <h1 className="font-primary font-semibold text-[24px] leading-[32px] text-secondary/100 mb-[80px]">
                  Sorry! Something seems to have gone wrong
                </h1>
                <FollowLink appearance="primary-full" linkTo="/">
                  Go Home
                </FollowLink>
                <p className="font-primary italic text-gray/30 mt-10">
                  {error.statusText || error.message}
                </p>
              </div>
            </PageGrid>
          </section>
        </main>
      </div>
    </>
  );
};
