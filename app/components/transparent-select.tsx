import { Select } from "antd";
import { BaseOptionType, DefaultOptionType } from "antd/es/select";

export default function TransparentSelect({
  options,
  placeholder = "Select",
  onChange,
}: {
  options: BaseOptionType[] | DefaultOptionType[];
  placeholder?: string;
  onChange?: (value: any) => void;
}) {
  return (
    <Select
      className="custom-select h-11 w-full"
      options={options}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
