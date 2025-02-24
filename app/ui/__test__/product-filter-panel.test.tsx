import FilterDataContext from "@/app/contexts/FilterProductContext";
import { IFilterProduct } from "@/app/definitions/interfaces";
import ProductFilterPanel from "@/app/ui/product-filter-panel";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  Button,
  ButtonProps,
  Input,
  InputProps,
  Select,
  SelectProps,
  Slider,
} from "antd";
import { SliderRangeProps } from "antd/es/slider";
import { ButtonHTMLAttributes } from "react";

// Mock dependencies
jest.mock("antd", () => {
  const antd = jest.requireActual("antd");
  return {
    ...antd,
    Select: (props: SelectProps) => <Select {...props} />,
    Button: (props: ButtonProps) => <Button {...props} />,
    Input: (props: InputProps) => <Input {...props} />,
    Slider: (props: SliderRangeProps) => <Slider {...props} />,
  };
});

jest.mock("@/app/components/TransparentInput", () => ({
  __esModule: true,
  default: jest
    .fn()
    .mockImplementation((props) => (
      <input data-testid="transparent-input" {...props} />
    )),
}));

jest.mock("@/app/components/CustomSlider", () => ({
  __esModule: true,
  default: jest
    .fn()
    .mockImplementation(
      ({
        min,
        max,
        values,
        onChange,
      }: {
        min: number;
        max: number;
        values: number[];
        onChange: (values: number[]) => void;
      }) => (
        <input
          data-testid="custom-slider"
          type="range"
          min={min}
          max={max}
          value={values[0]}
          onChange={(e) => onChange([Number(e.target.value), max])}
        />
      ),
    ),
}));

jest.mock("@/app/components/GlowingButton", () => ({
  __esModule: true,
  default: jest
    .fn()
    .mockImplementation(
      (props: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) => (
        <button data-testid="glowing-button">{props.label}</button>
      ),
    ),
}));

jest.mock("@/app/components/TransparentSelect", () => ({
  __esModule: true,
  default: jest
    .fn()
    .mockImplementation(
      ({
        placeholder,
        value,
        options,
        onChange,
      }: {
        placeholder: string;
        value: string;
        options: { value: string; label: string }[];
        onChange: (value: string) => void;
      }) => (
        <select
          data-testid={`transparent-select-${placeholder}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ),
    ),
}));

// Mock useDebounce to execute immediately
jest.mock("@/app/hooks/useDebounce", () => ({
  useDebounce: <T extends (...args: unknown[]) => void>(fn: T): T => fn,
}));

describe("ProductFilterPanel Component", () => {
  let setFilterDataMock: jest.Mock;
  const initialFilterData: IFilterProduct = {
    page: 1,
    priceRange: [0.01, 200],
    search: "",
    theme: "",
    tier: "",
    price: "",
    time: "",
  };

  beforeEach(() => {
    setFilterDataMock = jest.fn();

    render(
      <FilterDataContext.Provider
        value={{
          setFilterData: setFilterDataMock,
          filterData: initialFilterData,
        }}
      >
        <ProductFilterPanel />
      </FilterDataContext.Provider>,
    );
  });

  it("renders input field for search", () => {
    const input = screen.getByTestId("transparent-input");
    expect(input).toBeInTheDocument();
  });

  it("renders price range slider", () => {
    const slider = screen.getByTestId("custom-slider");
    expect(slider).toBeInTheDocument();
  });

  it("updates search value and triggers filter update", () => {
    const input = screen.getByTestId("transparent-input");
    fireEvent.change(input, { target: { value: "test search" } });

    expect(setFilterDataMock).toHaveBeenCalledWith(
      expect.objectContaining({ search: "test search" }),
    );
  });

  it("updates price range and triggers filter update", () => {
    const slider = screen.getByTestId("custom-slider");
    fireEvent.change(slider, { target: { value: "50" } });

    expect(setFilterDataMock).toHaveBeenCalledWith(
      expect.objectContaining({ priceRange: [50, 200] }),
    );
  });

  it("renders all dropdowns with correct options", () => {
    const dropdowns = [
      "select tier",
      "select theme",
      "select time",
      "select price",
    ];

    dropdowns.forEach((placeholder) => {
      const select = screen.getByTestId(`transparent-select-${placeholder}`);
      expect(select).toBeInTheDocument();
    });
  });

  it("resets all filters when clicking reset button", () => {
    const resetButton = screen.getByText("Reset filter");
    fireEvent.click(resetButton);

    expect(setFilterDataMock).toHaveBeenCalledWith(
      expect.objectContaining({
        search: "",
        priceRange: [0.01, 200],
        tier: "",
        theme: "",
        time: "",
        price: "",
      }),
    );
  });

  it("renders the search button", () => {
    const searchButton = screen.getByTestId("glowing-button");
    expect(searchButton).toBeInTheDocument();
    expect(searchButton).toHaveTextContent("Search");
  });
});
