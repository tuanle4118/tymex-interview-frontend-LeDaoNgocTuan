import { IProduct } from "@/app/definitions/interfaces";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!req.url) return;

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const characterImages = [
    "/characters/assassin-character.png",
    "/characters/basketball-girl-character.png",
    "/characters/mafia-england-character.png",
    "/characters/neon-guy-character.png",
    "/characters/the-DJ-character.png",
  ];

  console.log("tuanldn", page);

  try {
    const response = await fetch(
      `${baseUrl}/products?_page=${page}&_limit=${limit}`,
    );

    const data: IProduct[] = await response.json();

    // Insert a random character image
    data.forEach((item) => {
      const randomImage =
        characterImages[Math.floor(Math.random() * characterImages.length)];
      item.imageSrc = randomImage;
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error().json();
  }
}
