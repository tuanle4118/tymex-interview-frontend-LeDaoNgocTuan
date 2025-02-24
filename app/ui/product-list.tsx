"use client";
import GlowingButton from "@/app/components/GlowingButton";
import { IProduct } from "@/app/definitions/interfaces";
import Styles from "@/app/styles/CharacterList.module.css";
import {
  ExclamationCircleOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Card, Col, Flex, Row, Skeleton, Tag } from "antd";
import Image from "next/image";
import { useContext, useEffect, useMemo, useState } from "react";
import useSWR from "swr";

import FilterDataContext from "../contexts/FilterProductContext";
import {
  getCharacterBackground,
  getCharacterImage,
} from "../utils/productsUtils";

const fetcher = (url: string) =>
  fetch(url).then(async (res) => {
    const totalCount = res.headers.get("x-total-count");
    const data = (await res.json()) as IProduct[];

    return { data, totalCount: totalCount ? +totalCount : 0 };
  });

const categories = [
  "All",
  "Upper Body",
  "Lower Body",
  "Hat",
  "Shoes",
  "Accessory",
  "Legendary",
  "Mythic",
  "Epic",
  "Rare",
];

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ProductList() {
  const { filterData } = useContext(FilterDataContext);

  const [page, setPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>(["All"]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoadMore, setIsLoadMore] = useState(false); // Track if user clicked view more
  const [isClient, setIsClient] = useState(false); // Prevent hydration mismatch
  const [newItemCount, setNewItemCount] = useState(0); // Track new items being loaded

  const filterTagParams = selectedTags
    .filter((tag) => tag !== "All")
    .map((tag) => `category=${tag}`)
    .join("&");

  const queryUrl = useMemo(() => {
    const {
      price,
      priceRange,
      search,
      theme,
      tier,
      time,
      page: filterPage,
    } = filterData;

    if (!isLoadMore) setPage(filterPage);

    const url = new URL("/products", baseUrl);
    const queryParams = new URLSearchParams({
      _limit: "20",
      _page: String(page),
      q: search || "",
      price_gte: String(priceRange[0]),
      price_lte: String(priceRange[1]),
      tier_like: tier || "",
      theme_like: theme || "",
    });

    const sortFields = [
      time ? "createdBy" : null,
      price ? "price" : null,
    ].filter(Boolean);

    const orderFields = [time, price].filter(Boolean);

    if (sortFields.length) queryParams.set("_sort", sortFields.join(","));
    if (orderFields.length) queryParams.set("_order", orderFields.join(","));
    url.search = queryParams.toString();

    return url;
  }, [filterData, filterTagParams, page]);

  const { data, error, isLoading } = useSWR(queryUrl, fetcher);

  const totalPages = useMemo(() => (data?.totalCount ?? 0) / 20, [data]);

  useEffect(() => {
    if (data?.data) {
      setProducts((prevProducts) =>
        isLoadMore ? [...prevProducts, ...data.data] : data.data,
      );
      setNewItemCount(isLoadMore ? data.data.length : 0);
      setIsLoadMore(false);
    }
  }, [data]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Avoid hydration mismatch in Next.js

  if (error) {
    return <div className="w-full text-center text-white">Error occurs</div>;
  }

  const handleSelectTags = (tag: string, checked: boolean) => {
    setSelectedTags((prevTags) => {
      if (tag !== "All") {
        const index = prevTags.indexOf("All");
        if (index > -1) prevTags.splice(index, 1);
      }
      if (prevTags.length === 1 && !checked) {
        prevTags.push("All");
      }
      return checked ? [...prevTags, tag] : prevTags.filter((t) => t !== tag);
    });
  };

  const handleLoadMore = () => {
    if (page >= totalPages) return;
    setIsLoadMore(true);
    setPage((pre) => pre + 1);
  };

  return (
    <div className="flex flex-col gap-10">
      <Flex gap={10} justify="center" wrap className="md:px-16 2xl:px-5">
        {categories.map<React.ReactNode>((tag) => (
          <Tag.CheckableTag
            style={{
              background: "#DA458F", //overwrite antd styles
              color: "#FFFFFF", //overwrite antd styles
            }}
            key={tag}
            className={`${!selectedTags.some((stag) => stag === tag) && "opacity-40"} text-md flex-grow p-3 px-5 text-center font-bold hover:opacity-80`}
            checked={selectedTags.includes(tag)}
            onChange={(checked) => handleSelectTags(tag, checked)}
          >
            {tag}
          </Tag.CheckableTag>
        ))}
      </Flex>

      <ProductGrid
        products={products}
        newItemCount={newItemCount}
        isLoading={isLoading}
      />

      <GlowingButton
        onClick={handleLoadMore}
        className="self-center"
        label="View more"
        width="20rem"
        padding="2rem"
        disabled={page >= totalPages}
        loading={isLoading}
      />
    </div>
  );
}

function ProductGrid({
  products,
  newItemCount = 20,
  isLoading,
}: {
  products: IProduct[];
  newItemCount: number;
  isLoading: boolean;
}) {
  return !isLoading && !products.length ? (
    <span className="m-10 grid place-content-center gap-5">
      <ExclamationCircleOutlined className="text-7xl text-primary" />
      <span className="text-xl text-gray-400">No Data</span>
    </span>
  ) : (
    <div
      className={`max-h-[130rem] overflow-y-auto overflow-x-hidden ${Styles.customScrollbar}`}
    >
      <Row justify="center" gutter={[10, 20]}>
        {products.map((product) => (
          <Col key={product.id}>
            <Card className="h-96 border-none bg-[#3A384199]">
              <div className="grid gap-5">
                <CharacterImage product={product} />
                <ProductInformation product={product} />
              </div>
            </Card>
          </Col>
        ))}

        {isLoading &&
          Array.from({ length: newItemCount || 20 }).map((_, index) => (
            <Col key={`skeleton-${index}`}>
              <ProductCardSkeleton />
            </Col>
          ))}
      </Row>
    </div>
  );
}

function CharacterImage({ product }: { product: IProduct }) {
  return (
    <div
      className={`relative z-10 h-60 w-60 rounded-md bg-gradient-to-r ${getCharacterBackground(product.category)}`}
    >
      <Image
        priority
        src={getCharacterImage(product.imageId)}
        alt={product.title}
        width={200}
        height={500}
        className="absolute bottom-0 left-0 right-0 m-auto"
      />

      <div className="absolute left-2 top-2 rounded-lg bg-[#3A384199] p-2 py-2 text-sm text-white">
        {product.category}
      </div>

      <div className="group absolute right-2 top-2 cursor-pointer">
        <HeartOutlined
          className={`${product.isFavorite ? "hidden" : "block"} text-xl text-white ${!product.isFavorite && "group-hover:hidden"}`}
        />
        <HeartFilled
          className={`${product.isFavorite ? "block" : "hidden"} text-xl text-white ${!product.isFavorite && "group-hover:block"} `}
        />
      </div>
    </div>
  );
}

function ProductInformation({ product }: { product: IProduct }) {
  return (
    <>
      <section className="flex items-center justify-between text-white">
        <span
          className="w-32 truncate text-nowrap font-bold"
          title={product.title}
        >
          {product.title}
        </span>
        <span className="flex gap-1">
          <Image
            src="icons/currency-icon.svg"
            alt="currency"
            width={10}
            height={10}
          />
          {product.price}
          <span>ETH</span>
        </span>
      </section>

      <section className="flex items-center gap-4">
        <Badge
          count={
            product.author.onlineStatus === "online" ? (
              <Image
                width={12}
                height={12}
                src="icons/online-icon.svg"
                alt="checked"
              />
            ) : (
              <Image
                width={12}
                height={12}
                src="icons/offline-icon.svg"
                alt="checked"
              />
            )
          }
          className="relative"
          offset={[-5, 27]}
        >
          <Avatar
            shape="circle"
            src={product.author.avatar}
            className="bg-white"
          />
        </Badge>

        <span className="cursor-pointer text-nowrap text-white hover:underline">{`${product.author.firstName} ${product.author.lastName}`}</span>
      </section>
    </>
  );
}

function ProductCardSkeleton() {
  return (
    <Card className="h-96 border-none bg-[#3A384199]">
      <div className="grid gap-5">
        <Skeleton.Image style={{ width: "15rem", height: "15rem" }} active />
        <Skeleton active paragraph={{ rows: 2 }} />
      </div>
    </Card>
  );
}
