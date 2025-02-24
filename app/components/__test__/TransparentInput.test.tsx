import { fireEvent, render, screen } from "@testing-library/react";
import TransparentInput from "../TransparentInput";

jest.mock("antd", () => {
  const actualAntd = jest.requireActual("antd");
  return {
    ...actualAntd,
    Input: jest.fn(({ value, onChange, placeholder, prefix }) => (
      <div data-testid="transparent-input">
        {prefix && <span data-testid="input-prefix">{prefix}</span>}
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          data-testid="input-field"
        />
      </div>
    )),
  };
});

describe("TransparentInput", () => {
  it("renders with the correct placeholder", () => {
    render(<TransparentInput placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("displays the correct value", () => {
    const handleChange = jest.fn();
    render(<TransparentInput value="Test Value" onChange={handleChange} />);
    expect(screen.getByDisplayValue("Test Value")).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const handleChange = jest.fn();
    render(<TransparentInput onChange={handleChange} />);

    const input = screen.getByTestId("input-field");
    fireEvent.change(input, { target: { value: "New Text" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renders the prefix if provided", () => {
    render(<TransparentInput prefix={<span>🔍</span>} />);
    expect(screen.getByTestId("input-prefix")).toBeInTheDocument();
  });
});
