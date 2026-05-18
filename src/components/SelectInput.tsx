import { useState } from 'react';

export type Option<T = string> = {
  value: T;
  label: string;
  color?: string;
};

type SelectProps<T> = {
  name: string;
  options: Option<T>[];
  value: T;
  defaultColor?: string;
  className?: string;
  onChange: (value: T) => void;
};

const SelectInput = <T,>({
  options,
  value,
  defaultColor = '#374151',
  onChange,
  className = '',
}: SelectProps<T>) => {
  const [open, setOpen] = useState(false);

  const selected = options.find((opt) => opt.value === value);
  const activeColor = selected?.color ?? defaultColor;

  return (
    <div
      tabIndex={-1}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}
      className={`relative ${className}`}
    >
      <button
        type='button'
        onClick={() => setOpen((prev) => !prev)}
        style={{ background: activeColor }}
        className='flex w-full items-center justify-between gap-2 rounded-xl px-3 py-1.5 text-sm text-white outline-none'
      >
        {selected?.label}
        <svg
          className={`h-3 w-3 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox='0 0 12 12'
          fill='currentColor'
        >
          <path d='M6 8L1 3h10z' />
        </svg>
      </button>

      {open && (
        <ul className='absolute top-full left-0 z-50 mt-1 min-w-full overflow-hidden rounded-xl border border-gray-700 bg-gray-900 py-1 shadow-xl'>
          {options.map((option) => (
            <li key={String(option.value)}>
              <button
                type='button'
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className='flex w-full items-center gap-2 px-3 py-1.5 text-sm text-white hover:bg-gray-800'
              >
                {option.color && (
                  <span
                    className='h-2 w-2 shrink-0 rounded-full'
                    style={{ background: option.color }}
                  />
                )}
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectInput;
