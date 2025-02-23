import { Select } from "antd";
import { BaseOptionType, DefaultOptionType } from "antd/es/select";
import { valueType } from "antd/es/statistic/utils";

export default function TransparentSelect({
  options,
  placeholder = "Select",
  onChange,
  value,
}: {
  options: BaseOptionType[] | DefaultOptionType[];
  placeholder?: string;
  value?: valueType;
  onChange?: (value: valueType) => void;
}) {
  return (
    <Select
      value={value}
      className="custom-select h-11 w-full"
      options={options}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
