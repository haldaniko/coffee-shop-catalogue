/* eslint-disable max-len */
import classNames from 'classnames';
import { Noop } from 'react-hook-form';

type Props = {
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...event: any[]) => void;
  onBlur: Noop;
  id: string;
  text: string;
};

export const LabeledRadioInput: React.FC<Props> = ({
  value,
  onChange,
  onBlur,
  id,
  text,
}) => {
  return (
    <label
      htmlFor={id}
      className={classNames(
        'relative flex gap-4 items-center mb-2 hover:cursor-pointer w-fit',
        {
          'pointer-events-none': value === id,
        },
      )}
    >
      <input
        type="radio"
        id={id}
        value={id}
        checked={value === id}
        onChange={onChange}
        onBlur={onBlur}
        className="peer appearance-none w-10 h-10 border border-primary/100 rounded-full p-[7px] bg-gray/10 focus:outline-none hover:bg-focused/100 hover:cursor-pointer checked:pointer-events-none focus:shadow-focus-shadow"
      />
      <div className="absolute w-5 h-5 left-[10px] bg-primary/100 rounded-full pointer-events-none transition-opacity duration-300 opacity-0 peer-checked:opacity-100" />
      {text}
    </label>
  );
};
