/* eslint-disable max-len */
import close from '../../../assets/icons/close_44x44.svg';
import { SectionTitle } from '../typography/SectionTitle';
import { SelectOption } from '../../types/SelectOption';
import { FilterForm } from './components/FilterForm';
import { DISTRICTS, TIME_OPTIONS } from './constants';

type Props = {
  selectedCity: string;
  cities: string[];
  modalRef: React.MutableRefObject<HTMLDialogElement | null>;
  closeModal: () => void;
};

export const FilterModal: React.FC<Props> = ({
  selectedCity,
  cities,
  modalRef,
  closeModal,
}) => {
  const cityOptions: SelectOption[] = cities.map(city => ({
    label: city,
    value: city.toLowerCase(),
  }));

  const defaultCity =
    cityOptions.find(v => v.label === selectedCity) || cityOptions[0];

  const defaultFormValues = {
    name: '',
    city: defaultCity,
    address: '',
    network: 'allTypes',
    open: TIME_OPTIONS.openning[0],
    close: TIME_OPTIONS.closing[0],
    district: DISTRICTS.Kyiv[0],
    rating: [1.0, 5.0],
    price: {
      budgetary: false,
      middle: false,
      premium: false,
    },
    owner: false,
    activities: {
      books: false,
      board_games: false,
      live_music: false,
      pets: false,
    },
    conveniences: {
      wifi: false,
      restroom: false,
      delivery: false,
      booking: false,
      parking: false,
      terrace: false,
    },
  };

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

          <FilterForm
            key={defaultFormValues.city?.label}
            defaultFormValues={defaultFormValues}
            cityOptions={cityOptions}
          />
        </div>
      </div>
    </dialog>
  );
};
