import { render, screen } from "@testing-library/react";
import useSWR from "swr";
import ProductList from "../product-list";

// Mock useSWR globally
jest.mock("swr");

describe("ProductList Component", () => {
  it("renders loading state", () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(<ProductList />);

    expect(screen.getAllByTestId("loading-skeleton")[0]).toBeInTheDocument();
  });

  it("renders product list when data is available", () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: {
        data: [
          {
            id: "1",
            title: "Test Product",
            category: "Epic",
            price: 10,
            imageId: "2", // Ensure this exists
            isFavorite: false,
            author: {
              firstName: "John",
              lastName: "Doe",
              avatar:
                "https://robohash.org/nihiltotamdolorem.png?size=100x100&set=set1", // Ensure this exists
              onlineStatus: "online",
            },
          },
          {
            id: "12",
            title: "Test Product 2",
            category: "Epic",
            price: 10,
            imageId: "4", // Ensure this exists
            isFavorite: false,
            author: {
              firstName: "John",
              lastName: "Doe",
              avatar:
                "https://robohash.org/nihiltotamdolorem.png?size=100x100&set=set1", // Ensure this exists
              onlineStatus: "online",
            },
          },
        ],
        totalCount: 1,
      },
      error: null,
      isLoading: false,
    });

    render(<ProductList />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test Product 2")).toBeInTheDocument();
  });

  it("renders error message when fetch fails", () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: null,
      error: new Error("Fetch failed"),
      isLoading: false,
    });

    render(<ProductList />);

    expect(screen.getByText("Error occurs")).toBeInTheDocument();
  });
});
