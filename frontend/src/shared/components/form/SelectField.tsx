import Select, { OptionProps } from 'react-select';
import { SelectOption } from '../../types/SelectOption';
import classNames from 'classnames';
import doneIcon from '../../../assets/icons/done.svg';

type CustomOptionData = SelectOption;
type CustomOptionProps = OptionProps<CustomOptionData>;

const CustomOption: React.FC<CustomOptionProps> = props => {
  const { innerProps, innerRef } = props;

  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={classNames('flex justify-between items-center px-5 py-4', {
        'bg-focused/100 cursor-pointer': props.isFocused,
        'text-primary/100 pointer-events-none': props.isSelected,
      })}
    >
      <h4>{props.data.label}</h4>
      {props.isSelected && (
        <span
          style={{ maskImage: `url(${doneIcon})` }}
          className="w-6 h-6 bg-secondary/100"
        ></span>
      )}
    </div>
  );
};

type Props = {
  options: SelectOption[];
  // containerClasses: string;
};

export const SelectField: React.FC<Props> = ({ options }) => {
  return (
    <Select
      placeholder="Select city..."
      components={{ Option: CustomOption }}
      classNames={{
        placeholder: () =>
          'font-primary text-[18px] leading-[22px] text-gray/100',
        control: state =>
          state.isFocused
            ? 'border-2 border-primary/100 rounded-lg py-[7px] px-2'
            : 'border border-primary/100 rounded-lg py-[7px] px-2',
        menu: () => 'bg-gray/10 border rounded-lg border-primary/100 py-[7px]',
        indicatorsContainer: state => {
          let classes = '';

          if (state.selectProps.menuIsOpen) {
            classes += 'rotate-180';
          }

          return classes;
        },
        // container: () => containerClasses,
        dropdownIndicator: () => 'text-primary/100',
        // option: state => {
        //   let classes = 'px-5 py-4';

        //   if (state.isSelected) {
        //     classes += ' text-primary/100';
        //   }

        //   if (state.isFocused && !state.isSelected) {
        //     classes += ' bg-focused/100';
        //   }

        //   return classes;
        // },
      }}
      options={options}
      // defaultValue={options[0]}
      unstyled
    />
  );
};
