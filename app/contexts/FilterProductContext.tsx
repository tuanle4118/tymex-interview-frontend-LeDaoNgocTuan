"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";
import { IFilterProduct } from "../definitions/interfaces";

export const initialFilterData: IFilterProduct = {
  page: 1,
  priceRange: [0.01, 200],
  search: "",
  theme: "",
  tier: "",
  price: "",
  time: "",
};

const FilterDataContext = createContext<{
  filterData: IFilterProduct;
  setFilterData: Dispatch<SetStateAction<IFilterProduct>>;
}>({
  filterData: initialFilterData,
  setFilterData: (value) => value,
});

export const FilterDataProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [filterData, setFilterData] =
    useState<IFilterProduct>(initialFilterData);

  return useMemo(
    () => (
      <FilterDataContext.Provider value={{ filterData, setFilterData }}>
        {children}
      </FilterDataContext.Provider>
    ),
    [filterData],
  );
};

export default FilterDataContext;
