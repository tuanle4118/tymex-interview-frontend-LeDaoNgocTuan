import { ProductBackground } from "../../definitions/enums";
import { ProductCategories } from "../../definitions/types";
import {
  getCharacterBackground,
  getCharacterImage,
} from "../productsUtils";

describe("getCharacterImage", () => {
  it("returns the correct character image for a given ID", () => {
    expect(getCharacterImage(1)).toBe("/characters/assassin-character.png");
    expect(getCharacterImage(5)).toBe("/characters/the-DJ-character.png");
    expect(getCharacterImage(10)).toBe("/characters/the-DJ-character.png");
  });

  it("returns an empty string if imageId is out of range", () => {
    expect(getCharacterImage(0)).toBe("");
    expect(getCharacterImage(21)).toBe("");
  });
});

describe("getCharacterBackground", () => {
  it("returns the correct background for each category", () => {
    expect(getCharacterBackground("Lower Body")).toBe(ProductBackground.common);
    expect(getCharacterBackground("Upper Body")).toBe(ProductBackground.common);
    expect(getCharacterBackground("Accessory")).toBe(ProductBackground.common);
    expect(getCharacterBackground("Hat")).toBe(ProductBackground.common);
    expect(getCharacterBackground("Shoes")).toBe(ProductBackground.common);
    expect(getCharacterBackground("Epic")).toBe(ProductBackground.epic);
    expect(getCharacterBackground("Rare")).toBe(ProductBackground.rare);
    expect(getCharacterBackground("Mythic")).toBe(ProductBackground.mythic);
    expect(getCharacterBackground("Legendary")).toBe(
      ProductBackground.legendary,
    );
  });

  it("returns undefined for an unknown category", () => {
    expect(
      getCharacterBackground("Unknown Category" as ProductCategories),
    ).toBeUndefined();
  });
});
