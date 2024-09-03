/* eslint-disable max-len */
import filter from '../../assets/icons/filter.svg';
import search from '../../assets/icons/search.svg';

type Props = {
  text: string;
  type: 'submit' | 'reset' | 'button';
  appearance: 'primary' | 'secondary';
  icon?: string;
};

export const Button: React.FC<Props> = ({ text, type, appearance, icon }) => {
  const general =
    'px-4 py-2 flex gap-2 items-center rounded-lg border-2 text-xl leading-[27px] font-primary h-fit';
  const primary = `${general} bg-primary/100 border-primary/100 font-semibold text-secondary/100`;
  const secondary = `${general} border-background/100 text-background/100`;
  const textStyle = '';
  const selectedIcon: { [index: string]: string } = {
    filter: `url(${filter})`,
    search: `url(${search})`,
  };

  return (
    <button
      type={type}
      className={appearance === 'primary' ? primary : secondary}
    >
      {icon && (
        <span
          style={{ maskImage: selectedIcon[icon] }}
          className={`w-6 h-6 ${appearance === 'primary' ? 'bg-secondary/100' : 'bg-background/100'}`}
        ></span>
      )}
      <span className={textStyle}>{text}</span>
    </button>
  );
};
