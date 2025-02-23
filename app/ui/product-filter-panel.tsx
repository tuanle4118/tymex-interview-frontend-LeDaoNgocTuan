"use client";
import TransparentInput from "@/app/components/TransparentInput";
import { CloseCircleFilled, SearchOutlined } from "@ant-design/icons";
import CustomSlider from "@/app/components/CustomSlider";
import GlowingButton from "@/app/components/GlowingButton";
import TransparentSelect from "@/app/components/TransparentSelect";
import { Col, Row } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { valueType } from "antd/es/statistic/utils";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import FilterDataContext from "../contexts/FilterProductContext";
import {
  PRICE_OPTIONS,
  THEME_OPTIONS,
  TIER_OPTIONS,
  TIME_OPTIONS,
} from "../definitions/constants";
import { useDebounce } from "../hooks/useDebounce";

export default function ProductFilterPanel() {
  const { setFilterData } = useContext(FilterDataContext);

  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0.01, 200]);
  const [tier, setTier] = useState("");
  const [theme, setTheme] = useState("");
  const [time, setTime] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  useEffect(() => {
    handleSetFilterData();
  }, [search, priceRange, tier, theme, time, price]);

  const handleSetFilterData = useDebounce(() => {
    setFilterData({
      search,
      priceRange,
      tier,
      theme,
      time,
      price,
      page: 1,
    });
  }, 300);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event?.target?.value;
    setSearch(searchValue);
  };

  const handleFilterPriceRange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleResetFilter = () => {
    setSearch("");
    setPriceRange([0.01, 200]);
    setTier("");
    setTheme("");
    setTime("");
    setPrice("");
  };

  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <TransparentInput
          value={search}
          placeholder="Quick search"
          prefix={<SearchOutlined />}
          onChange={handleSearch}
        />
      </Col>

      <Col xs={{ span: 24 }} sm={{ span: 12 }} xl={{ span: 24 }}>
        <CustomSlider
          values={priceRange}
          onChange={handleFilterPriceRange}
          min={0.01}
          max={200}
          title="PRICE"
        />
      </Col>

      <SelectFilter
        value={tier}
        onChange={setTier}
        label="tier"
        options={TIER_OPTIONS}
      />
      <SelectFilter
        value={theme}
        onChange={setTheme}
        label="theme"
        options={THEME_OPTIONS}
      />
      <SelectFilter
        value={time}
        onChange={setTime}
        label="time"
        options={TIME_OPTIONS}
      />
      <SelectFilter
        value={price}
        onChange={setPrice}
        label="price"
        options={PRICE_OPTIONS}
      />

      <Col
        className="flex items-center justify-center gap-20"
        xs={{ span: 24 }}
        sm={{ span: 12 }}
        xl={{ span: 24 }}
      >
        <button
          onClick={handleResetFilter}
          className="flex cursor-pointer text-nowrap py-2 text-white hover:bg-slate-600/70 xl:gap-3"
        >
          <CloseCircleFilled className="text-yellow-400" /> Reset filter
        </button>
        <GlowingButton label="Search" width="10rem" />
      </Col>
    </Row>
  );
}

function SelectFilter({
  label,
  options,
  onChange,
  value,
}: {
  label: string;
  options: DefaultOptionType[];
  value?: valueType;
  onChange: (value: string) => void;
}) {
  return (
    <Col xs={{ span: 24 }} sm={{ span: 12 }} xl={{ span: 24 }}>
      <p className="mb-2 text-sm font-semibold text-[#89888B]">
        {label.toLocaleUpperCase()}
      </p>
      <TransparentSelect
        value={value}
        onChange={(value) => onChange(value as string)}
        options={options}
        placeholder={`select ${label}`}
      />
    </Col>
  );
}
