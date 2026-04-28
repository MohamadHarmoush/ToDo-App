export type Direction = 'up' | 'down' | 'left' | 'right';

interface Props {
  className?: string;
  direction?: Direction;
}

const angles = {
  up: '-rotate-90',
  down: 'rotate-90',
  left: 'rotate-180',
  right: 'rotate-0',
};

const getRotateAngle = (direction: Direction) => {
  return angles[direction];
};

export const ArrowIcon = ({ className = '', direction = 'up' }: Props) => {
  const rotate = getRotateAngle(direction);
  return (
    <svg
      xmlns='http://w3.org'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={`h-6 w-6 transition-transform ${rotate} ${className}`}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
    </svg>
  );
};
