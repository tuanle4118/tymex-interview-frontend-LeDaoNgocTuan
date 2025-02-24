import Footer from "@/app/ui/footer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ColProps, DividerProps, RowProps } from "antd";

jest.mock("antd", () => {
  const antd = jest.requireActual("antd");
  return {
    ...antd,
    Row: (props: RowProps) => <div {...props} />,
    Col: (props: ColProps) => <div {...props} />,
    Divider: (props: DividerProps) => <div {...props} />,
  };
});

describe("Footer Component", () => {
  it("renders contact information correctly", () => {
    render(<Footer />);
    expect(screen.getByText("01234568910")).toBeInTheDocument();
    expect(screen.getByText("tymex-talent@tyme.com")).toBeInTheDocument();
  });

  it("renders subscription input and button", () => {
    render(<Footer />);
    expect(
      screen.getByPlaceholderText("Your email address"),
    ).toBeInTheDocument();
    expect(screen.getByText("Subscribe")).toBeInTheDocument();
  });

  it("should allow typing in the email input", async () => {
    render(<Footer />);
    const input = screen.getByPlaceholderText("Your email address");
    await userEvent.type(input, "test@example.com");
    expect(input).toHaveValue("test@example.com");
  });

  it("should render the Subscribe button", () => {
    render(<Footer />);
    const button = screen.getByText("Subscribe");
    expect(button).toBeInTheDocument();
  });

  it("should allow clicking the Subscribe button without errors", async () => {
    render(<Footer />);
    const button = screen.getByText("Subscribe");

    await userEvent.click(button);

    // Since there's no onClick behavior in Footer, we simply assert that the button still exists
    expect(button).toBeInTheDocument();
  });
});
