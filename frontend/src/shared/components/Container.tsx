type Props = {
  children: React.ReactNode;
};

export const Container: React.FC<Props> = ({ children }) => {
  return <div className="max-w-[1072px] mx-auto my-0 px-14px">{children}</div>;
};
