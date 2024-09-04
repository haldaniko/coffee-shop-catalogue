/* eslint-disable max-len */

type Props = {
  size: '80' | '100' | '150' | '200';
  positionClasses?: string;
};

export const Bean: React.FC<Props> = ({ size, positionClasses = '' }) => {
  const styleGeneral = 'block w-full h-full bg-no-repeat bg-contain';
  const sizeValue = `${size}px`;
  let bg = '';

  switch (size) {
    case '80':
      bg = 'bg-bean80';
      break;
    case '100':
      bg = 'bg-bean100';
      break;
    case '150':
      bg = 'bg-bean150';
      break;
    case '200':
      bg = 'bg-bean200';
      break;
    default:
      break;
  }

  return (
    <div
      style={{ width: sizeValue, height: sizeValue }}
      className={positionClasses}
    >
      <span className={`${styleGeneral} ${bg}`}></span>
    </div>
  );
};
