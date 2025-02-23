import { Slider } from "antd";

export default function CustomSlider({
  values,
  onChange,
  min,
  max,
  title,
}: {
  values: number[];
  onChange?: (event: number[]) => void;
  min: number;
  max: number;
  title?: string;
}) {
  return (
    <div className="text-white">
      {title && <p className="mb-2 text-sm font-semibold">{title}</p>}

      <div className="relative w-full">
        <Slider
          range
          min={min}
          max={max}
          step={min}
          defaultValue={values}
          onChange={onChange}
          className="custom-slider"
          styles={{
            handle: {
              width: "18px",
              height: "18px",
              backgroundColor: "transparent",
            },
            track: {
              background: "linear-gradient(90deg, #DA458F, #B621FE)",
              height: 8,
            },
            rail: { background: "#444", height: 8 },
          }}
        />

        {/* Tooltip for the right handle */}
        <div
          className="absolute top-[-40px] translate-x-[-50%] text-nowrap rounded bg-pink-500 px-3 py-1 text-sm text-white"
          style={{ left: `${(values[1] / (200 + 5)) * 100}%` }}
        >
          {values[1]} ETH
          <div className="absolute -bottom-1 left-1/2 h-2 w-2 rotate-45 bg-pink-500"></div>
        </div>
      </div>

      <div className="mt-5 flex justify-between text-xs">
        <span>{min} ETH</span>
        <span>{max} ETH</span>
      </div>
    </div>
  );
}
