"use client";
import Styles from "@/app/styles/character-list.module.css";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Avatar, Badge, Card, Col, Flex, Row, Tag } from "antd";
import Image from "next/image";
import useSWR from "swr";
import GlowingButton from "@components/glowing-button";
import { IProduct } from "@/app/definitions/interfaces";
import { useMemo, useState } from "react";

export default function CharacterList() {
  const [selectedTags, setSelectedTags] = useState<string[]>(["All"]);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: characters, error } = useSWR<IProduct[]>(
    "/api/characters?page=1&limit=40",
    fetcher,
  );

  if (error) {
    return <div className="w-full text-center text-white">Error occurs</div>;
  }

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

  const handleSelectTags = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
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

      <div
        className={`h-[130rem] overflow-y-auto overflow-x-hidden ${Styles.customScrollbar}`}
      >
        <Row
          justify={"center"}
          gutter={[
            { xs: 10, sm: 20, xl: 40 },
            { xs: 10, sm: 20, xl: 40 },
          ]}
        >
          {characters?.map((character) => (
            <Col key={character.id} className="gutter-row">
              <Card className="h-96 border-none bg-[#3A384199]">
                <div className="grid gap-5">
                  <CharacterImage character={character} />
                  <ProductInformation character={character} />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <GlowingButton
        className="self-center"
        label="View more"
        width="20rem"
        padding="2rem"
      />
    </div>
  );
}

function CharacterImage({ character }: { character: IProduct }) {
  const radiantBackgrounds = [
    "from-[#DD5AFE] to-[#6366F1]",
    "from-[#49DD81] to-[#22B4C6]",
    "from-[#43A6F6] to-[#5868F3]",
    "from-[#FE5A5A] to-[#F163D2]",
    "from-[#FE955A] to-[#F1DA63]",
  ];

  return useMemo(
    () => (
      <div
        className={`relative z-10 h-60 w-60 rounded-md bg-gradient-to-r ${radiantBackgrounds[Math.floor(Math.random() * radiantBackgrounds.length)]}`}
      >
        <Image
          priority
          src={character.imageSrc}
          alt={character.title}
          width={200}
          height={500}
          className="absolute bottom-0 left-0 right-0 m-auto"
        />

        <div className="absolute left-2 top-2 rounded-lg bg-[#3A384199] p-2 py-2 text-sm text-white">
          {character.category}
        </div>

        <div className="group absolute right-2 top-2 cursor-pointer">
          <HeartOutlined
            className={`${character.isFavorite ? "hidden" : "block"} text-xl text-white ${!character.isFavorite && "group-hover:hidden"}`}
          />
          <HeartFilled
            className={`${character.isFavorite ? "block" : "hidden"} text-xl text-white ${!character.isFavorite && "group-hover:block"} `}
          />
        </div>
      </div>
    ),
    [],
  );
}

function ProductInformation({ character }: { character: IProduct }) {
  return (
    <>
      <section className="flex items-center justify-between text-white">
        <span
          className="w-32 truncate text-nowrap font-bold"
          title={character.title}
        >
          {character.title}
        </span>
        <span className="flex gap-1">
          <Image
            src="icons/currency-icon.svg"
            alt="currency"
            width={10}
            height={10}
          />
          {character.price}
          <span>ETH</span>
        </span>
      </section>

      <section className="flex items-center gap-4">
        <Badge
          count={
            character.author.onlineStatus === "online" ? (
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
            src={character.author.avatar}
            className="bg-white"
          />
        </Badge>

        <span className="cursor-pointer text-nowrap text-white hover:underline">{`${character.author.firstName} ${character.author.lastName}`}</span>
      </section>
    </>
  );
}
