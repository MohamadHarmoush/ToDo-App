type Props = {
  value: string;
  placeholder?: string;
  expanded: boolean;
  onUpdate: (notes: string) => void;
};
export const TaskNotes = ({ value, expanded, onUpdate, placeholder = 'Add notes...' }: Props) => {
  const expandedPanelClassName = expanded
    ? 'h-auto scale-100 opacity-100'
    : 'pointer-events-none h-0 scale-95 overflow-hidden opacity-0';

  return (
    <div className={`transition-all duration-300 ease-in-out ${expandedPanelClassName}`}>
      <textarea
        id='notes'
        className='w-full rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-gray-600 dark:bg-gray-800'
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
