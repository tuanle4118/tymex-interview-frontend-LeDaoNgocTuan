import { fireEvent, render, screen } from "@testing-library/react";
import GlowingButton from "../GlowingButton";

jest.mock("antd", () => {
  const actualAntd = jest.requireActual("antd");
  return {
    ...actualAntd,
    Button: jest.fn(({ children, disabled, onClick, icon }) => (
      <button
        data-testid="glowing-button"
        disabled={disabled}
        onClick={onClick}
      >
        {icon}
        {children}
      </button>
    )),
  };
});

describe("GlowingButton", () => {
  it("renders with the correct label", () => {
    render(<GlowingButton label="Click Me" />);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<GlowingButton label="Click Me" onClick={handleClick} />);

    const button = screen.getByTestId("glowing-button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disables button when disabled prop is true", () => {
    render(<GlowingButton label="Disabled" disabled />);
    expect(screen.getByTestId("glowing-button")).toBeDisabled();
  });

  it("displays loading icon when loading is true", () => {
    render(<GlowingButton label="Loading" loading />);
    expect(
      screen.getByTestId("glowing-button").querySelector("svg"),
    ).toBeInTheDocument();
  });
});
