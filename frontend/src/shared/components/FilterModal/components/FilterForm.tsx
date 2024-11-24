/* eslint-disable max-len */
import { Controller, useForm } from 'react-hook-form';
import { PageGrid } from '../../PageGrid';
import { IFilterFormValues } from '../../../types/filterForm/FilterFormValues';
import { SelectOption } from '../../../types/SelectOption';
import { SelectField } from '../../form/SelectField';
import { SelectDistrictField } from '../../form/SelectDistrictField';
import { SelectTimeField } from '../../form/SelectTimeField';
import { RangeField } from '../../form/RangeField';
import { Button } from '../../Button';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DevTool } from '@hookform/devtools';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LabeledRadioInput } from '../../form/LabeledRadioInput';
import { LabeledCheckbox } from '../../form/LabeledCheckbox';
import { CONVENIENCES, DISTRICTS, TIME_OPTIONS } from '../constants';
import { FieldTitle } from '../../form/FieldTitle';
import {
  getInputTextValue,
  getIsNetwork,
  getPricingRate,
  getTags,
} from '../utils';
import { ACTIVITIES } from '../constants';

type Props = {
  defaultFormValues: IFilterFormValues;
  cityOptions: SelectOption[];
};

export const FilterForm: React.FC<Props> = ({
  defaultFormValues,
  cityOptions,
}) => {
  const [resetKey, setResetKey] = useState(false);
  const { register, control, handleSubmit, watch, reset } =
    useForm<IFilterFormValues>({
      defaultValues: defaultFormValues,
    });
  const navigate = useNavigate();

  let selectedCity = watch('city');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    selectedCity = watch('city');
  }, [watch, selectedCity, resetKey]);

  const onSubmit = (formData: IFilterFormValues) => {
    const {
      city,
      name,
      address,
      district,
      owner,
      activities,
      conveniences,
      network,
      price,
      rating,
      open,
      close,
    } = formData;

    const params = {
      city: city?.value,
      name: getInputTextValue(name),
      address: getInputTextValue(address),
      district: district?.value,
      with_owner: owner,
      tags: getTags(activities, conveniences),
      is_network: getIsNetwork(network),
      pricing_rate: getPricingRate(price),
      min_rating: rating[0] !== 1 && rating[0],
      max_rating: rating[1] !== 5 && rating[1],
      hours_from: open?.value,
      hours_to: close?.value,
    };

    for (const key in params) {
      if (!params[key as keyof typeof params]) {
        delete params[key as keyof typeof params];
      }
    }

    const path = `/coffeeshops/?${Object.entries(params)
      .map(v => {
        return `${v[0]}=${v[1]}`;
      })
      .join('&')}`;

    navigate(path);
  };

  const onReset = () => {
    reset(defaultFormValues);
    setResetKey(prev => !prev);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <PageGrid>
          <label htmlFor="city" className="col-span-4 row-start-1">
            <FieldTitle asTag={'span'}>City</FieldTitle>

            <Controller
              name="city"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <SelectField
                  options={cityOptions}
                  placeholder="Select city"
                  value={value}
                  onChange={newValue => {
                    onChange(newValue);
                  }}
                />
              )}
            />
          </label>

          <label className="col-span-4 row-start-2 h-fit">
            <FieldTitle asTag={'span'}>Name</FieldTitle>

            <input
              type="text"
              {...register('name')}
              placeholder="Enter the name"
              className="w-full border border-primary/100 rounded-lg bg-gray/10 px-[7px] py-[7px] placeholder:text-[18px] placeholder:leading-[22px] placeholder:text-gray/100 focus:border-2 focus:px-[6px] focus:py-[6px] focus:border-primary/100 outline-none"
            />
          </label>

          <label className="col-span-4 row-start-3 h-fit">
            <FieldTitle asTag={'span'}>Address</FieldTitle>

            <input
              type="text"
              {...register('address')}
              placeholder="Enter the address"
              className="w-full border border-primary/100 rounded-lg bg-gray/10 px-[7px] py-[7px] placeholder:text-[18px] placeholder:leading-[22px] placeholder:text-gray/100 focus:border-2 focus:px-[6px] focus:py-[6px] focus:border-primary/100 outline-none"
            />
          </label>

          <label htmlFor="district" className="col-span-4 row-start-4">
            <FieldTitle asTag={'span'}>District</FieldTitle>

            <Controller
              name="district"
              control={control}
              rules={{ required: false }}
              render={({ field: { onChange, value } }) => (
                <SelectDistrictField
                  options={DISTRICTS[selectedCity?.label || 'Kyiv']}
                  value={value}
                  onChange={newValue => {
                    onChange(newValue);
                  }}
                />
              )}
            />
          </label>

          <div className="col-span-4 row-start-5 flex flex-col">
            <FieldTitle asTag={'p'}>Types of coffee shops</FieldTitle>

            <Controller
              name="network"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <LabeledRadioInput
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    id="allTypes"
                    text="All"
                  />

                  <LabeledRadioInput
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    id="network"
                    text="Network coffee shops"
                  />

                  <LabeledRadioInput
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    id="local"
                    text="Local coffee shop"
                  />
                </>
              )}
            />
          </div>

          <div className="col-span-4 row-start-1">
            <FieldTitle asTag={'p'}>Working hours</FieldTitle>

            <div className="flex gap-4">
              <div className="flex gap-2 items-center">
                <Controller
                  name="open"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <SelectTimeField
                      options={TIME_OPTIONS.openning}
                      value={value}
                      onChange={newValue => {
                        onChange(newValue);
                      }}
                    />
                  )}
                />
                <p>AM</p>
              </div>
              <div className="flex gap-2 items-center">
                <Controller
                  name="close"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <SelectTimeField
                      options={TIME_OPTIONS.closing}
                      value={value}
                      onChange={newValue => {
                        onChange(newValue);
                      }}
                    />
                  )}
                />
                <p>PM</p>
              </div>
            </div>
          </div>

          <label
            htmlFor="rating"
            className="col-span-4 row-start-2 flex flex-col"
          >
            <FieldTitle asTag={'span'}>Rating</FieldTitle>

            <Controller
              name="rating"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RangeField
                  rtl={false}
                  min={1}
                  max={5}
                  step={0.1}
                  onChange={newValue => {
                    onChange(newValue);
                  }}
                  value={value}
                />
              )}
            />
          </label>

          <div className="col-span-4 row-start-3 row-span-2 flex flex-col">
            <FieldTitle asTag={'p'}>Pricing policy</FieldTitle>

            <LabeledCheckbox
              id="budgetary"
              inputName="price.budgetary"
              register={register}
              label="Budgetary"
            />

            <LabeledCheckbox
              id="middleClass"
              inputName="price.middle"
              register={register}
              label="Middle class"
            />

            <LabeledCheckbox
              id="premium"
              inputName="price.premium"
              register={register}
              label="Premium"
            />
          </div>

          <div className="col-span-4 row-start-5 flex flex-col">
            <FieldTitle asTag={'p'}>Only with owners</FieldTitle>

            <LabeledCheckbox
              id="owner"
              inputName="owner"
              register={register}
              label="Yes"
            />
          </div>

          <div className="col-span-4 row-span-2 flex flex-col">
            <FieldTitle asTag={'p'}>Activities</FieldTitle>

            {ACTIVITIES.map((activity, index) => {
              const { id, label } = activity;

              return (
                <LabeledCheckbox
                  key={index}
                  id={id}
                  inputName={`activities.${id}`}
                  register={register}
                  label={label}
                />
              );
            })}
          </div>

          <div className="col-span-4 row-span-3 flex flex-col">
            <FieldTitle asTag={'p'}>Conveniences</FieldTitle>

            {CONVENIENCES.map((activity, index) => {
              const { id, label } = activity;

              return (
                <LabeledCheckbox
                  key={index}
                  id={id}
                  inputName={`conveniences.${id}`}
                  register={register}
                  label={label}
                />
              );
            })}
          </div>
        </PageGrid>
        <div className="flex justify-center gap-5 pt-8">
          <Button type="button" appearance="secondary" action={onReset}>
            Resset All
          </Button>
          <Button type="submit" appearance="primary">
            Apply
          </Button>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
};
