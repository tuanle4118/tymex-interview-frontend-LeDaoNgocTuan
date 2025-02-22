import { Input } from "antd";
import { ChangeEvent, ReactNode } from "react";

export default function TransparentInput({
  value,
  placeholder,
  onChange,
  prefix,
  className,
}: {
  value?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent) => void;
  prefix?: ReactNode;
  className?: string;
}) {
  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      prefix={prefix}
      className={`${className} custom-input h-11 border border-gray-500 text-white placeholder-white focus:border-white focus:ring-0`}
      style={{
        boxShadow: "none",
        background: "transparent",
      }}
    />
  );
}
