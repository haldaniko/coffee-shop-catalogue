/* eslint-disable max-len */
import close from '../../../assets/icons/close_44x44.svg';
import { PageGrid } from '../PageGrid';
import { SectionTitle } from '../typography/SectionTitle';
import { SelectOption } from '../../types/SelectOption';
import { SelectField } from '../form/SelectField';
import { SelectTimeField } from '../form/SelectTimeField';
import { RangeField } from '../form/RangeField';
import { Button } from '../Button';

const cityOptions: SelectOption[] = [
  { label: 'Kyiv', value: 'kyiv' },
  { label: 'Lviv', value: 'lviv' },
  { label: 'Kharkiv', value: 'kharkiv' },
];

const openningTimeOptions: SelectOption[] = [
  { label: '07:00', value: '7' },
  { label: '08:00', value: '8' },
  { label: '09:00', value: '9' },
  { label: '10:00', value: '10' },
  { label: '11:00', value: '11' },
  { label: '12:00', value: '12' },
];

const closingTimeOptions: SelectOption[] = [
  { label: '01:00', value: '13' },
  { label: '02:00', value: '14' },
  { label: '03:00', value: '15' },
  { label: '04:00', value: '16' },
  { label: '05:00', value: '17' },
  { label: '06:00', value: '18' },
  { label: '07:00', value: '19' },
  { label: '08:00', value: '20' },
  { label: '09:00', value: '21' },
  { label: '10:00', value: '22' },
  { label: '11:00', value: '23' },
];

type Props = {
  modalRef: React.MutableRefObject<HTMLDialogElement | null>;
  closeModal: () => void;
};

export const FilterModal: React.FC<Props> = ({ modalRef, closeModal }) => {
  return (
    <dialog
      ref={modalRef}
      className="min-w-[100vw] min-h-screen outline-none m-0"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="min-h-screen bg-secondary/100/70 py-[120px]">
        <div className="container px-[104px] py-10 border-2 border-primary/100 bg-gray/10 rounded-3xl">
          <div className="flex justify-between items-center mb-10">
            <SectionTitle extraClasses="mb-0">Filters</SectionTitle>
            <button className="w-11 h-11" onClick={closeModal}>
              <span
                style={{ maskImage: `url(${close})` }}
                className="block w-11 h-11 bg-secondary/100"
              ></span>
            </button>
          </div>

          <form action="#">
            <PageGrid>
              <label htmlFor="city" className="col-span-4 row-start-1">
                <span className="inline-block font-primary text-[18px] leading-[22px] text-secondary/100 mb-[8px]">
                  City
                </span>
                <SelectField options={cityOptions} />
              </label>

              <label className="col-span-4 row-start-2">
                <span className="inline-block font-primary text-[18px] leading-[22px] text-secondary/100 mb-[8px]">
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter the name"
                  className="w-full border border-primary/100 rounded-lg bg-gray/10 px-[7px] py-[7px] placeholder:text-[18px] placeholder:leading-[22px] placeholder:text-gray/100 focus:border-2 focus:border-primary/100 outline-none"
                />
              </label>

              <label className="col-span-4 row-start-3">
                <span className="inline-block font-primary text-[18px] leading-[22px] text-secondary/100 mb-[8px]">
                  Address
                </span>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter the address"
                  className="w-full border border-primary/100 rounded-lg bg-gray/10 px-[7px] py-[7px] placeholder:text-[18px] placeholder:leading-[22px] placeholder:text-gray/100 focus:border-2 focus:border-primary/100 outline-none"
                />
              </label>

              <label htmlFor="district" className="col-span-4 row-start-4">
                <span className="inline-block font-primary text-[18px] leading-[22px] text-secondary/100 mb-[8px]">
                  District / microdistrict
                </span>
                <SelectField options={cityOptions} />
              </label>

              <div className="col-span-4 row-start-5 flex flex-col">
                <p className="font-primary text-[18px] leading-[22px] text-secondary/100 mb-[8px]">
                  Types of coffee shops
                </p>
                <label
                  htmlFor="allTypes"
                  className="flex gap-4 items-center mb-2"
                >
                  <input
                    type="radio"
                    id="allTypes"
                    name="types"
                    value="allTypes"
                    className="peer relative appearance-none w-10 h-10 border border-primary/100 rounded-full p-[7px] bg-gray/10 focus:outline-none checked:bg-done checked:bg-center checked:bg-no-repeat"
                    defaultChecked
                  />
                  All
                </label>
                <label
                  htmlFor="network"
                  className="flex gap-4 items-center mb-2"
                >
                  <input
                    type="radio"
                    id="network"
                    name="types"
                    value="network"
                    className="peer relative appearance-none w-10 h-10 border border-primary/100 rounded-full p-[7px] bg-gray/10 focus:outline-none checked:bg-done checked:bg-center checked:bg-no-repeat"
                  />
                  Network coffee shops
                </label>
                <label htmlFor="local" className="flex gap-4 items-center mb-2">
                  <input
                    type="radio"
                    id="local"
                    name="types"
                    value="local"
                    className="peer relative appearance-none w-10 h-10 border border-primary/100 rounded-full p-[7px] bg-gray/10 focus:outline-none checked:bg-done checked:bg-center checked:bg-no-repeat"
                  />
                  Local coffee shop
                </label>
              </div>

              <div className="col-span-4 row-start-1">
                <p className="font-primary text-[18px] leading-[22px] text-secondary/100 mb-[8px]">
                  Working hours
                </p>

                <div className="flex gap-4">
                  <div className="flex gap-2 items-center">
                    <SelectTimeField options={openningTimeOptions} />
                    <p>AM</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <SelectTimeField options={closingTimeOptions} />
                    <p>PM</p>
                  </div>
                </div>
              </div>

              <label
                htmlFor="rating"
                className="col-span-4 row-start-2 flex flex-col"
              >
                <span className="inline-block font-primary text-[18px] leading-[22px] text-secondary/100 mb-[8px]">
                  Rating
                </span>
                <RangeField rtl={false} min={1.0} max={5.0} step={0.1} />
              </label>

              <div className="col-span-4 row-start-3 row-span-2 flex flex-col">
                <p className="font-primary text-[18px] leading-[22px] text-secondary/100 mb-[8px]">
                  Pricing policy
                </p>
                <label
                  htmlFor="budgetary"
                  className="flex gap-4 items-center mb-2"
                >
                  <input
                    type="checkbox"
                    id="budgetary"
                    name="budgetary"
                    className="peer relative appearance-none w-10 h-10 border border-primary/100 rounded-lg p-[7px] bg-gray/10 focus:outline-none checked:bg-done checked:bg-center checked:bg-no-repeat"
                  />
                  Budgetary
                </label>
                <label
                  htmlFor="middleClass"
                  className="flex gap-4 items-center mb-2"
                >
                  <input
                    type="checkbox"
                    id="middleClass"
                    name="middleClass"
                    className="peer relative appearance-none w-10 h-10 border border-primary/100 rounded-lg p-[7px] bg-gray/10 focus:outline-none checked:bg-done checked:bg-center checked:bg-no-repeat"
                  />
                  Middle class
                </label>
                <label
                  htmlFor="premium"
                  className="flex gap-4 items-center mb-2"
                >
                  <input
                    type="checkbox"
                    id="premium"
                    name="premium"
                    className="peer relative appearance-none w-10 h-10 border border-primary/100 rounded-lg p-[7px] bg-gray/10 focus:outline-none checked:bg-done checked:bg-center checked:bg-no-repeat"
                  />
                  Premium
                </label>
              </div>

              <div className="col-span-4 row-start-5 flex flex-col">
                <p className="font-primary text-[18px] leading-[22px] text-secondary/100 mb-[8px]">
                  Only with owners
                </p>
                <label htmlFor="owner" className="flex gap-4 items-center mb-2">
                  <input
                    type="checkbox"
                    id="owner"
                    name="owner"
                    className="peer relative appearance-none w-10 h-10 border border-primary/100 rounded-lg p-[7px] bg-gray/10 focus:outline-none checked:bg-done checked:bg-center checked:bg-no-repeat"
                  />
                  Yes
                </label>
              </div>

              <div className="col-span-4 row-span-2 flex flex-col">
                <p className="font-primary text-[18px] leading-[22px] text-secondary/100 mb-[8px]">
                  Activities
                </p>
                <label htmlFor="books" className="flex gap-4 items-center mb-2">
                  <input
                    type="checkbox"
                    id="books"
                    name="books"
                    className="peer relative appearance-none w-10 h-10 border border-primary/100 rounded-lg p-[7px] bg-gray/10 focus:outline-none checked:bg-done checked:bg-center checked:bg-no-repeat"
                  />
                  Books
                </label>
                <label
                  htmlFor="boardGames"
                  className="flex gap-4 items-center mb-2"
                >
                  <input
                    type="checkbox"
                    id="boardGames"
                    name="boardGames"
                    className="peer relative appearance-none w-10 h-10 border border-primary/100 rounded-lg p-[7px] bg-gray/10 focus:outline-none checked:bg-done checked:bg-center checked:bg-no-repeat"
                  />
                  Board games
                </label>
                <label
                  htmlFor="liveMusic "
                  className="flex gap-4 items-center mb-2"
                >
                  <input
                    type="checkbox"
                    id="liveMusic"
                    name="liveMusic"
                    className="peer relative appearance-none w-10 h-10 border border-primary/100 rounded-lg p-[7px] bg-gray/10 focus:outline-none checked:bg-done checked:bg-center checked:bg-no-repeat"
                  />
                  Live music
                </label>
                <label htmlFor="pets " className="flex gap-4 items-center mb-2">
                  <input
                    type="checkbox"
                    id="pets"
                    name="pets"
                    className="peer relative appearance-none w-10 h-10 border border-primary/100 rounded-lg p-[7px] bg-gray/10 focus:outline-none checked:bg-done checked:bg-center checked:bg-no-repeat"
                  />
                  Pets
                </label>
              </div>

              <div className="col-span-4 row-span-3 flex flex-col">
                <p className="font-primary text-[18px] leading-[22px] text-secondary/100 mb-[8px]">
                  Conveniences
                </p>
                <label htmlFor="wifi" className="flex gap-4 items-center mb-2">
                  <input
                    type="checkbox"
                    id="wifi"
                    name="wifi"
                    className="peer relative appearance-none w-10 h-10 border border-primary/100 rounded-lg p-[7px] bg-gray/10 focus:outline-none checked:bg-done checked:bg-center checked:bg-no-repeat"
                  />
                  WiFi
                </label>
                <label
                  htmlFor="restroom"
                  className="flex gap-4 items-center mb-2"
                >
                  <input
                    type="checkbox"
                    id="restroom"
                    name="restroom"
                    className="peer relative appearance-none w-10 h-10 border border-primary/100 rounded-lg p-[7px] bg-gray/10 focus:outline-none checked:bg-done checked:bg-center checked:bg-no-repeat"
                  />
                  Restroom
                </label>
                <label
                  htmlFor="delivery"
                  className="flex gap-4 items-center mb-2"
                >
                  <input
                    type="checkbox"
                    id="delivery"
                    name="delivery"
                    className="peer relative appearance-none w-10 h-10 border border-primary/100 rounded-lg p-[7px] bg-gray/10 focus:outline-none checked:bg-done checked:bg-center checked:bg-no-repeat"
                  />
                  Delivery
                </label>
                <label
                  htmlFor="booking"
                  className="flex gap-4 items-center mb-2"
                >
                  <input
                    type="checkbox"
                    id="booking"
                    name="booking"
                    className="peer relative appearance-none w-10 h-10 border border-primary/100 rounded-lg p-[7px] bg-gray/10 focus:outline-none checked:bg-done checked:bg-center checked:bg-no-repeat"
                  />
                  Booking
                </label>
                <label
                  htmlFor="parking"
                  className="flex gap-4 items-center mb-2"
                >
                  <input
                    type="checkbox"
                    id="parking"
                    name="parking"
                    className="peer relative appearance-none w-10 h-10 border border-primary/100 rounded-lg p-[7px] bg-gray/10 focus:outline-none checked:bg-done checked:bg-center checked:bg-no-repeat"
                  />
                  Parking
                </label>
                <label
                  htmlFor="terrace"
                  className="flex gap-4 items-center mb-2"
                >
                  <input
                    type="checkbox"
                    id="terrace"
                    name="terrace"
                    className="peer relative appearance-none w-10 h-10 border border-primary/100 rounded-lg p-[7px] bg-gray/10 focus:outline-none checked:bg-done checked:bg-center checked:bg-no-repeat"
                  />
                  Terrace
                </label>
              </div>
            </PageGrid>
            <div className="flex justify-center gap-5 pt-8">
              <Button
                text={'Resset All'}
                type={'reset'}
                appearance="secondary"
              />
              <Button text={'Apply'} type={'submit'} appearance="primary" />
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};
