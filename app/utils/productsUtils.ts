import { ProductBackground } from "../definitions/enums";
import { ProductCategories } from "../definitions/types";

export const getCharacterImage = (imageId: number) => {
  const characterImages = [
    "/characters/assassin-character.png",
    "/characters/neon-guy-character.png",
    "/characters/mafia-england-character.png",
    "/characters/basketball-girl-character.png",
    "/characters/the-DJ-character.png",
    "/characters/assassin-character.png",
    "/characters/neon-guy-character.png",
    "/characters/mafia-england-character.png",
    "/characters/basketball-girl-character.png",
    "/characters/the-DJ-character.png",
    "/characters/assassin-character.png",
    "/characters/neon-guy-character.png",
    "/characters/mafia-england-character.png",
    "/characters/basketball-girl-character.png",
    "/characters/the-DJ-character.png",
    "/characters/assassin-character.png",
    "/characters/neon-guy-character.png",
    "/characters/mafia-england-character.png",
    "/characters/basketball-girl-character.png",
    "/characters/the-DJ-character.png",
  ];

  return characterImages?.[imageId - 1] ?? "";
};

export const getCharacterBackground = (category: ProductCategories) => {
  const radiantBackgrounds: Record<ProductCategories, ProductBackground> = {
    "Lower Body": ProductBackground.common,
    "Upper Body": ProductBackground.common,
    Accessory: ProductBackground.common,
    Hat: ProductBackground.common,
    Shoes: ProductBackground.common,

    Epic: ProductBackground.epic,

    Rare: ProductBackground.rare,

    Mythic: ProductBackground.mythic,

    Legendary: ProductBackground.legendary,
  };

  return radiantBackgrounds[category];
};
