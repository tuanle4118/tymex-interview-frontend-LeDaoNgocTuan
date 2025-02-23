import { ProductCategories, ProductThemes, ProductTiers } from "./types";

export interface IProduct {
  id: number;
  title: string;
  category: ProductCategories;
  price: number;
  isFavorite: boolean;
  createdAt: number;
  theme: ProductThemes;
  tier: ProductTiers;
  imageId: number;
  author: IAuthor;
}

export interface IAuthor {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  avatar: string;
  onlineStatus: string;
}

export interface IFilterProduct {
  search: string;
  tier: string;
  theme: string;
  time: string;
  price: string;
  priceRange: number[];
  page: number;
}
