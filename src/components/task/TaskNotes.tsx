type Props = {
  value: string;
  placeholder?: string;
  expanded: boolean;
  onUpdate: (notes: string) => void;
  className?: string;
};
export const TaskNotes = ({
  value,
  expanded,
  onUpdate,
  placeholder = 'Add notes...',
  className = '',
}: Props) => {
  const expandedPanelClassName = expanded
    ? 'h-auto scale-100 opacity-100'
    : 'pointer-events-none h-0 scale-95 overflow-hidden opacity-0';

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${expandedPanelClassName} ${className}`}
    >
      <textarea
        className='w-full rounded-lg bg-gray-800 p-2 text-xs outline-none'
        placeholder={placeholder}
        rows={4}
        value={value}
        onChange={(e) => {
          onUpdate(e.target.value);
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    </div>
  );
};
