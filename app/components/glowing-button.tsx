import { Button } from "antd";
import { MouseEvent } from "react";

export default function GlowingButton({
  label,
  width,
  height,
  padding,
  onClick,
  className,
}: {
  label: string;
  width?: string;
  height?: string;
  padding?: string;
  onClick?: (event: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
  className?: string;
}) {
  return (
    <Button
      onClick={onClick}
      style={{
        background: "linear-gradient(to right, #DA458F, #DA34DD)", // Ensures background stays on hover,
        color: "white",
        border: "none",
        width,
        height,
        padding,
      }}
      className={`${className} pointer-cursor before:from-primary before:to-secondary relative h-10 rounded px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:animate-pulse before:rounded-lg before:bg-gradient-to-r before:blur-md hover:scale-105`}
    >
      {label}
    </Button>
  );
}
