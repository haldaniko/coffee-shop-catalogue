import logo from '../../assets/logo.svg';

export const Logo = () => {
  return (
    <a href="/" className="flex">
      {/* <img src="" alt="" /> */}
      <span
        style={{ maskImage: `url(${logo})` }}
        className="block w-[83px] h-[83px] bg-primary/100 hover:bg-default/100"
      ></span>
    </a>
  );
};
