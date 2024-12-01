/* eslint-disable max-len */
import classNames from 'classnames';
import { WorkTime } from '../../../shared/types/coffeeShop/WorkTime';
import starMarkerIcon from '../../../assets/icons/star-marker.svg';

const week = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

function startWithCapital(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

type Props = {
  schedule: WorkTime | undefined;
  currentDay: string;
};

export const WorkingTime: React.FC<Props> = ({ schedule, currentDay }) => {
  const styleText = `relative text-lg leading-[22px] p-2`;

  return (
    <ul className="flex gap-6">
      {week.map(day => {
        return (
          <li
            key={day}
            className={classNames(styleText, {
              'text-primary/100 ml-[21px]': currentDay === day,
              'text-gray/30': currentDay !== day,
            })}
          >
            {currentDay === day && (
              <span
                style={{
                  maskImage: `url(${starMarkerIcon})`,
                  maskSize: 'cover',
                  maskRepeat: 'no-repeat',
                }}
                className="absolute left-[-21px] top-[18px] block w-5 h-5 bg-primary/100"
              ></span>
            )}
            <div>
              <p>{startWithCapital(day)}</p>
              {schedule ? (
                <p>
                  {schedule[`${day}_open` as keyof Omit<WorkTime, 'id'>].slice(
                    0,
                    -3,
                  )}
                  -
                  {schedule[`${day}_close` as keyof Omit<WorkTime, 'id'>].slice(
                    0,
                    -3,
                  )}
                </p>
              ) : (
                <p>no info</p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
