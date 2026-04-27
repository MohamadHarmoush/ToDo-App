interface Option {
  value: string;
  label: string;
}
interface SelectProps {
  name: string;
  options: Option[];
  className?: string;
  onChange: (item: Option) => {};
}
const SelectInput = ({
    name,
    options,
    onChange,
    className = ''
}: SelectProps) => {
  return <div className={`rounded-xl ${className}`}>
    
  </div>;
};

export default SelectInput;
