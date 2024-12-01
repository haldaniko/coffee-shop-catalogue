/* eslint-disable max-len */
import classNames from 'classnames';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

type Props = {
  rtl: boolean;
  min: number;
  max: number;
  step: number;
  onChange: (values: number[]) => void;
  value: number[];
};

export const RangeField = forwardRef(
  ({ rtl, min, max, step, onChange, value }: Props, ref) => {
    const [values, setValues] = useState(value);

    useEffect(() => {
      setValues(value);
    }, [value]);

    useImperativeHandle(ref, () => ({
      getValues: () => values,
    }));

    const handleChange = (newValues: number[]) => {
      setValues(newValues);
      onChange(newValues);
    };

    return (
      <div className="flex justify-center flex-wrap">
        <div className="w-full flex justify-between">
          <span>{min}</span>
          <span>{max}</span>
        </div>
        <Range
          values={values}
          step={step}
          min={min}
          max={max}
          rtl={rtl}
          onChange={handleChange}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
              }}
              className="w-full flex h-[36px] px-[8px]"
            >
              <div
                ref={props.ref}
                style={{
                  height: '4px',
                  width: '100%',
                  borderRadius: '4px',
                  background: getTrackBackground({
                    values,
                    colors: ['#A6A5A5', '#7D8D71', '#A6A5A5'],
                    min: min,
                    max: max,
                    rtl,
                  }),
                  alignSelf: 'center',
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ index, props, isDragged }) => (
            <div
              {...props}
              key={props.key}
              style={{
                ...props.style,
                height: '24px',
                width: '24px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div className="absolute -bottom-[30px] font-primary text-[18px] leading-[22px] text-primary/100">
                {Number.isInteger(values[index])
                  ? values[index]
                  : values[index].toFixed(1)}
              </div>
              <div
                className={classNames('w-3 h-3 rotate-45', {
                  'bg-primary/100': !isDragged,
                  'bg-focused/100': isDragged,
                })}
              />
            </div>
          )}
        />
      </div>
    );
  },
);
