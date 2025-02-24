import { fireEvent, render, screen } from "@testing-library/react";
import { BaseOptionType, DefaultOptionType } from "antd/es/select";
import { valueType } from "antd/es/statistic/utils";
import TransparentSelect from "../TransparentSelect";

jest.mock("antd", () => {
  const actualAntd = jest.requireActual("antd");
  return {
    ...actualAntd,
    Select: jest.fn(
      ({
        value,
        options,
        placeholder,
        onChange,
      }: {
        options: BaseOptionType[] | DefaultOptionType[];
        placeholder?: string;
        value?: valueType;
        onChange?: (value: valueType) => void;
      }) => (
        <select
          data-testid="transparent-select"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ),
    ),
  };
});

describe("TransparentSelect", () => {
  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
  ];

  it("renders with the correct placeholder", () => {
    render(
      <TransparentSelect options={options} placeholder="Choose an option" />,
    );
    expect(screen.getByText("Choose an option")).toBeInTheDocument();
  });

  it("renders the correct options", () => {
    render(<TransparentSelect options={options} />);
    options.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("displays the correct selected value", () => {
    render(<TransparentSelect options={options} value="1" />);
    expect(screen.getByDisplayValue("Option 1")).toBeInTheDocument();
  });

  it("calls onChange when an option is selected", () => {
    const handleChange = jest.fn();
    render(<TransparentSelect options={options} onChange={handleChange} />);

    const select = screen.getByTestId("transparent-select");
    fireEvent.change(select, { target: { value: "2" } });

    expect(handleChange).toHaveBeenCalledWith("2");
  });
});
