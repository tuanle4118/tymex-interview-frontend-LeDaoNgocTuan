import { Button } from "antd";

export default function GlowingButton({ label }: { label: string }) {
  return (
    <Button
      style={{
        background: "linear-gradient(to right, #DA458F, #DA34DD)", // Ensures background stays on hover,
        color: "white",
        border: "none",
      }}
      className="relative h-10 rounded-lg px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:animate-pulse before:rounded-lg before:bg-gradient-to-r before:from-[#DA458F] before:to-[#DA34DD] before:blur-md hover:scale-105"
    >
      {label}
    </Button>
  );
}
