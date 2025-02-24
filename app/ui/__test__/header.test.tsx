import Header from "@/app/ui/header";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Header Component", () => {
  it("renders the Connect Wallet button", () => {
    render(<Header />);
    expect(screen.getByText("Connect Wallet")).toBeInTheDocument();
  });

  it("opens and closes the menu on button click and outside click", async () => {
    render(<Header />);
    const menuButton = screen.getByTestId("menu-dropdown");

    // Click menu button to open menu
    await userEvent.click(menuButton);
    expect(screen.getByTestId("expanding-menu")).toBeVisible();

    // Click outside to close menu
    await userEvent.click(document.body);
    // Check that it's not visible
    expect(screen.getByTestId("expanding-menu")).toHaveClass("invisible", {
      exact: false,
    });
    expect(screen.getByTestId("expanding-menu")).toHaveClass("opacity-0", {
      exact: false,
    });
  });

  it("renders the language dropdown", () => {
    render(<Header />);
    expect(screen.getByTestId("language-dropdown")).toBeInTheDocument();
  });
});
