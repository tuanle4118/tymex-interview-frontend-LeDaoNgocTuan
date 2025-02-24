import { fireEvent, render, screen } from "@testing-library/react";
import CustomSlider from "../CustomSlider";

jest.mock("antd", () => {
  const actualAntd = jest.requireActual("antd");
  return {
    ...actualAntd,
    Slider: jest.fn(({ defaultValue, onChange }) => (
      <input
        data-testid="custom-slider"
        type="range"
        defaultValue={defaultValue}
        onChange={(e) => onChange?.([Number(e.target.value), defaultValue[1]])}
      />
    )),
  };
});

describe("CustomSlider", () => {
  it("renders the slider with given props", () => {
    render(
      <CustomSlider values={[50, 150]} min={0} max={200} title="Price Range" />,
    );
    expect(screen.getByText("Price Range")).toBeInTheDocument();
    expect(screen.getByText("0 ETH")).toBeInTheDocument();
    expect(screen.getByText("200 ETH")).toBeInTheDocument();
    expect(screen.getByText("150 ETH")).toBeInTheDocument();
    expect(screen.getByTestId("custom-slider")).toBeInTheDocument();
  });

  it("calls onChange when the slider value changes", () => {
    const handleChange = jest.fn();
    render(
      <CustomSlider
        values={[50, 150]}
        min={0}
        max={200}
        onChange={handleChange}
      />,
    );

    const slider = screen.getByTestId("custom-slider");
    fireEvent.change(slider, { target: { value: "100" } });

    expect(handleChange).toHaveBeenCalledWith([100, 150]);
  });
});
