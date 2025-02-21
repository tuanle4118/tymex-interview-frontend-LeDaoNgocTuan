"use client";
import {
  CloseOutlined,
  DownOutlined,
  GlobalOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import GlowingButton from "../components/glowing-button";

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null); // Ref for the menu container

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  }, []);

  // Click outside to close
  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, handleClickOutside]);

  const languages = [
    { key: "en", label: "English" },
    { key: "vn", label: "Vietnamese" },
    { key: "fr", label: "Français" },
  ];

  const languageMenu = {
    items: languages.map((lang) => ({
      key: lang.key,
      label: <span>{lang.label}</span>,
    })),
  };

  return (
    <div className="fixed top-0 z-20 flex h-20 w-full items-center justify-between bg-black/50 px-10 xl:px-20 2xl:px-56">
      <nav className="hidden h-full items-center gap-10 lg:flex xl:gap-20">
        <MenuList />
      </nav>

      <MenuOutlined
        className="relative flex h-12 w-12 items-center justify-center text-4xl text-white lg:hidden"
        onClick={() => setOpen(true)}
      />

      <section className="flex gap-10">
        <GlowingButton label="Connect Wallet" />
        <Dropdown
          menu={languageMenu}
          trigger={["click"]}
          placement="bottomRight"
        >
          <div className="flex cursor-pointer items-center gap-2 space-x-1 text-white">
            <GlobalOutlined className="text-xl" />
            <DownOutlined className="text-sm" />
          </div>
        </Dropdown>
      </section>

      {/* Custom Expanding Menu */}
      <div
        ref={menuRef}
        aria-hidden={!open}
        className={`fixed left-6 top-20 w-72 rounded-3xl bg-gray-800/90 p-6 text-white shadow-2xl backdrop-blur-md transition-all duration-500 ease-in-out ${open ? "visible scale-100 opacity-100" : "invisible scale-90 opacity-0"}`}
      >
        <button
          className="absolute right-3 top-3 text-gray-400 transition-all hover:text-white"
          onClick={() => setOpen(false)}
        >
          <CloseOutlined className="text-xl" />
        </button>

        <div className="mt-6 flex flex-col space-y-4">
          <MenuList />
        </div>
      </div>
    </div>
  );
}

function MenuList() {
  const headerItems = [
    { title: "HOME", href: "/" },
    { title: "ABOUT US", href: "/" },
    { title: "OUR TEAMS", href: "/" },
    { title: "MARKETPLACE", href: "/" },
    { title: "ROADMAP", href: "/" },
    { title: "WHITEPAPER", href: "/" },
  ];

  return headerItems.map((item) => (
    <Link
      key={item.title}
      href={item.href}
      className="font-tekoSans group relative text-nowrap text-xl font-semibold text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-[#DA458F] hover:to-[#DA34DD] hover:bg-clip-text hover:text-transparent"
    >
      {item.title}
      <span className="absolute bottom-0 left-0 h-1 w-0 bg-gray-800 from-[#DA458F] to-[#DA34DD] transition-all duration-300 group-hover:w-1/3 group-hover:bg-gradient-to-r"></span>
    </Link>
  ));
}
