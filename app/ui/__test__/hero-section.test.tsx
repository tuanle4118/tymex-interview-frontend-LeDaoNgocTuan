import HeroSection from "@/app/ui/hero-section";
import { render, screen } from "@testing-library/react";
import { ImgHTMLAttributes } from "react";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

// Mock character images
jest.mock("@/public/characters/assassin-character.png", () => ({}));
jest.mock("@/public/characters/basketball-girl-character.png", () => ({}));
jest.mock("@/public/characters/mafia-england-character.png", () => ({}));
jest.mock("@/public/characters/neon-guy-character.png", () => ({}));
jest.mock("@/public/characters/the-DJ-character.png", () => ({}));
jest.mock("@/public/characters/the-DJ-title.svg", () => ({}));
jest.mock("@/public/icons/tag-icon.svg", () => ({}));
jest.mock("@/public/yellow-background.svg", () => ({}));

describe("HeroSection Component", () => {
  it("renders the background image correctly", () => {
    render(<HeroSection />);

    const backgroundDiv = screen.getByTestId("hero-section"); // Using role for a key section
    expect(backgroundDiv).toBeInTheDocument();
  });

  it("displays the tag icon", () => {
    render(<HeroSection />);

    const tagIcon = screen.getByAltText("tag");
    expect(tagIcon).toBeInTheDocument();
  });

  it("renders the character showcase section", () => {
    render(<HeroSection />);

    const showcaseSection = screen.getByTestId("character-showcase");
    expect(showcaseSection).toBeInTheDocument();
  });

  it("renders character list", () => {
    render(<HeroSection />);

    const characterNames = [
      "ASSASSIN",
      "NEON GUY",
      "MAFIA ENGLAND",
      "BASKETBALL GIRL",
    ];

    characterNames.forEach((name) => {
      expect(screen.getAllByAltText(name)[0]).toBeInTheDocument();
    });
  });

  it("renders the DJ character prominently", () => {
    render(<HeroSection />);

    const djCharacter = screen.getByAltText("the-dj-character");
    expect(djCharacter).toBeInTheDocument();
  });
});
