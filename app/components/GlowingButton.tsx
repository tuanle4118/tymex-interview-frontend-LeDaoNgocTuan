import { LoadingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { MouseEvent } from "react";

export default function GlowingButton({
  label,
  width,
  height,
  padding,
  onClick,
  className,
  disabled,
  loading,
}: {
  label: string;
  width?: string;
  height?: string;
  padding?: string;
  onClick?: (event: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <Button
      disabled={disabled || loading}
      onClick={onClick}
      style={{
        color: "white",
        border: "none",
        width,
        height,
        padding,
      }}
      icon={loading && <LoadingOutlined />}
      className={`${className} pointer-cursor relative h-10 rounded bg-gradient-to-r from-primary to-secondary px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:animate-pulse before:rounded-lg before:bg-gradient-to-r before:from-primary before:to-secondary before:blur-md hover:scale-105 disabled:bg-gray-700 disabled:text-gray-400 before:disabled:bg-none`}
    >
      {label}
    </Button>
  );
}
