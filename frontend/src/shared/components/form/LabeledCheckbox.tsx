/* eslint-disable max-len */
import { UseFormRegister } from 'react-hook-form';

type Props = {
  id: string;
  inputName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  label: string;
};

export const LabeledCheckbox: React.FC<Props> = ({
  id,
  inputName,
  register,
  label,
}) => {
  return (
    <label
      htmlFor={id}
      className="flex gap-4 items-center mb-2 w-fit hover:cursor-pointer"
    >
      <input
        type="checkbox"
        id={id}
        {...register(inputName)}
        className="peer relative appearance-none w-10 h-10 border border-primary/100 rounded-lg p-[7px] bg-gray/10 focus:outline-none checked:bg-done checked:bg-center checked:bg-no-repeat hover:cursor-pointer  focus:shadow-focus-shadow"
      />
      {label}
    </label>
  );
};
