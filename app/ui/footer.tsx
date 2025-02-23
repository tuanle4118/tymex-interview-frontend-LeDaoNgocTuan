import TransparentInput from "@/app/components/TransparentInput";
import GlowingButton from "@/app/components/GlowingButton";
import { Col, Divider, Row } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const navigation = [
    { title: "Home", href: "/" },
    { title: "Whitepaper", href: "/" },
    { title: "FAQs", href: "/" },
    { title: "About us", href: "/" },
    { title: "Marketplace", href: "/" },
    { title: "News", href: "/" },
    { title: "Our teams", href: "/" },
    { title: "Roadmap", href: "/" },
    { title: "Community", href: "/" },
  ];

  return (
    <div className="grid gap-10 bg-[#17161A] p-10 text-white lg:px-40 lg:pb-44 lg:pt-10">
      <Row justify={"space-between"} gutter={[50, 50]}>
        <Col className="grid gap-8">
          <span className="font-tekoSans text-2xl">NAVIGATION</span>
          <Row>
            {navigation.map((nav) => (
              <Col key={nav.title} span={8}>
                <Link className="hover:underline" href={nav.href}>
                  {nav.title}
                </Link>
              </Col>
            ))}
          </Row>
        </Col>

        <Col className="grid gap-8">
          <span className="font-tekoSans text-2xl">CONTACT US</span>

          <div className="grid xl:gap-5">
            <span className="flex items-center gap-2">
              <Image
                src="/icons/contact-icon.svg"
                alt="contact"
                width={24}
                height={24}
              />
              01234568910
            </span>
            <span className="flex items-center gap-2">
              <Image
                src="/icons/message-icon.svg"
                alt="message"
                width={24}
                height={24}
              />
              tymex-talent@tyme.com
            </span>
          </div>
        </Col>

        <Col className="flex flex-col gap-8">
          <span className="font-tekoSans text-2xl">
            SUBSCRIBE TO RECEIVE OUR LATEST UPDATE
          </span>

          <div className="flex items-center gap-5">
            <TransparentInput
              className="w-96"
              placeholder="Your email address"
            />
            <GlowingButton label="Subscribe" />
          </div>
        </Col>
      </Row>

      <Divider variant="solid" className="bg-[#3A3841]" />

      <div className="flex justify-between">
        <span>@2023 Tyme - Edit. All Rights reserved</span>

        <div className="flex gap-6">
          <Link className="hover:underline" href="/">
            Security
          </Link>
          <Link className="hover:underline" href="/">
            Legal
          </Link>
          <Link className="hover:underline" href="/">
            Privacy
          </Link>
        </div>
      </div>
    </div>
  );
}
