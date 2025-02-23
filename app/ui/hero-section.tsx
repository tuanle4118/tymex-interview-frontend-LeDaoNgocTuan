import Assassin from "@/public/characters/assassin-character.png";
import BasketballGirl from "@/public/characters/basketball-girl-character.png";
import Mafia from "@/public/characters/mafia-england-character.png";
import NeonGuy from "@/public/characters/neon-guy-character.png";
import TheDJ from "@/public/characters/the-DJ-character.png";
import TheDJTitle from "@/public/characters/the-DJ-title.svg";
import TagIcon from "@/public/icons/tag-icon.svg";
import YellowBackground from "@/public/yellow-background.svg";
import { Carousel } from "antd";
import Image, { StaticImageData } from "next/image";

export default function HeroSection() {
  return (
    <div className="relative inset-0 h-screen w-screen overflow-hidden bg-[url('/hero-section.png')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/60"></div>
      <Image
        src={TagIcon}
        alt="tag"
        className="absolute left-0 right-0 z-10 m-auto h-[40vh] w-[95%] xl:left-52 xl:m-0 xl:h-[70vh] xl:w-1/2"
      />
      <CharacterShowCase />
    </div>
  );
}

function CharacterShowCase() {
  return (
    <div className="absolute bottom-0 left-0 h-[60vh] md:h-[30vh]">
      <Image src={YellowBackground} alt="yellow-bg" className="w-screen" />
      <div className="absolute inset-0 top-5 bg-[#FBC625]"></div>
      <div className="absolute bottom-0 flex h-full w-full items-center justify-between px-8 md:px-24 lg:px-40 xl:px-20">
        <CharacterList />
        <div className="relative h-[130%] w-1/2 overflow-visible md:h-screen md:w-1/3">
          <Image
            priority
            src={TheDJ}
            alt="character-bg"
            className="absolute bottom-0 left-0 h-full max-w-72 scale-x-[-1] object-cover md:-left-[20rem] md:max-w-[50rem] xl:-left-[12rem] xl:bottom-20 xl:max-w-[45rem] 2xl:-left-[8rem]"
          />
          <Image
            priority
            src={TheDJTitle}
            alt="character-bg"
            className="absolute -left-5 bottom-1/3 max-w-60 md:-left-24 md:max-w-96 lg:-left-10 lg:max-w-[24rem] xl:bottom-[22rem] xl:left-24 xl:max-w-80 2xl:max-w-[24rem]"
          />
        </div>
      </div>
    </div>
  );
}

function CharacterList() {
  const characterList = [
    { img: Assassin, title: "ASSASSIN" },
    { img: NeonGuy, title: "NEON GUY" },
    { img: Mafia, title: "MAFIA ENGLAND" },
    { img: BasketballGirl, title: "BASKETBALL GIRL" },
  ];

  return (
    <div className="w-2/3">
      <div className="hidden h-[10.5rem] w-[15.5rem] md:block xl:hidden">
        <div className="relative">
          <Carousel
            arrows
            autoplay
            pauseOnHover
            className="z-10 border-2 border-solid border-[#FBC625]"
          >
            {characterList.map((character) => (
              <CharacterGroup key={character.title} characterInfo={character} />
            ))}
          </Carousel>
          <div className="absolute right-2 top-3 h-[10.5rem] w-[15.5rem] bg-black"></div>
        </div>
      </div>

      <div className="flex h-full w-full flex-col items-start justify-around md:hidden lg:flex-row lg:items-center xl:flex">
        {characterList.map((character) => (
          <CharacterGroup key={character.title} characterInfo={character} />
        ))}
      </div>
    </div>
  );
}

function CharacterGroup({
  characterInfo,
}: {
  characterInfo: {
    img: StaticImageData;
    title: string;
  };
}) {
  return (
    <div>
      <div className="relative hidden md:block xl:hidden">
        <div className="relative h-[10.5rem] w-[15.5rem] bg-[url('/characters/character-background.png')] bg-cover bg-center">
          <Image
            priority
            src={characterInfo.img}
            alt="character-img"
            className="absolute -bottom-20 left-0 right-0 mx-auto transition-all duration-500 group-hover:w-full"
          />
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-nowrap text-center font-tekoSans font-semibold text-white">
            {characterInfo.title}
          </span>
        </div>
      </div>

      <div className="relative block md:hidden xl:block">
        <div className="group relative z-10 h-20 w-36 cursor-pointer border-2 border-solid border-[#FBC625] bg-[url('/characters/character-background.png')] bg-cover bg-center md:h-24 md:w-40 lg:h-32 lg:w-48 xl:h-24 xl:w-40 2xl:h-[7.5rem] 2xl:w-[12.5rem]">
          <Image
            priority
            src={characterInfo.img}
            alt="character-bg"
            className="absolute bottom-0 left-0 right-0 mx-auto w-28 transition-all duration-500 group-hover:w-full xl:w-32 2xl:w-40"
          />
          <span className="text-md absolute -bottom-1 left-0 right-0 text-center font-tekoSans font-semibold text-white md:text-xl xl:hidden">
            {characterInfo.title}
          </span>
        </div>
        <div className="absolute -left-2 top-2 h-20 w-36 bg-black md:h-24 md:w-40 xl:h-24 xl:w-40 2xl:h-[7.5rem] 2xl:w-[12.5rem]"></div>
        <span className="xl:text-md absolute -bottom-8 left-0 right-0 mx-auto hidden text-nowrap text-center font-tekoSans text-sm font-semibold xl:-bottom-10 xl:block">
          {characterInfo.title}
        </span>
      </div>
    </div>
  );
}
