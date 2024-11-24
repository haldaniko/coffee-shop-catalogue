/* eslint-disable max-len */
import { Logo } from './Logo';
// import userIcon from '../../assets/icons/user.svg';
import { FollowLink } from './FollowLink';
import { Container } from './Container';

export const Navbar = () => {
  return (
    <header>
      <Container>
        <div className="p-[14px] flex justify-between">
          <div className="flex gap-[14px] items-center">
            <Logo />

            <nav>
              <ul className="flex gap-[16px]">
                <li>
                  <a
                    href="#"
                    className="font-primary font-medium text-[18px] leading-[27px] text-primary/100"
                  >
                    About us
                  </a>
                </li>

                {/* <li>
                  <a href="#">Favorite</a>
                </li>

                <li>
                  <a href="#">Add Coffee</a>
                </li> */}
              </ul>
            </nav>
          </div>

          <div className="flex gap-[16px] items-center">
            <select name="lang" id="lang" className="bg-background/100">
              <option value="en">EN</option>
              <option value="uk">UK</option>
            </select>

            <FollowLink appearance="borderless" linkTo="/login">
              Sign in
            </FollowLink>

            <FollowLink appearance="borderless" second linkTo="/registration">
              Sign up
            </FollowLink>
            {/* <div>
              <span
                style={{ maskImage: `url(${userIcon})` }}
                className="block w-10 h-10 bg-secondary/100"
              ></span>
            </div> */}
          </div>
        </div>
      </Container>
    </header>
  );
};
