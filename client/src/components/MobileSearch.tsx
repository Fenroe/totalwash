"use client";
import { useEffect, useRef } from "react";
import { useOutsideClick, useSearchProducts } from "@/hooks";
import { motion } from "framer-motion";

export const MobileSearch = ({ closeSearch }: { closeSearch: () => void }) => {
  const searchRef = useOutsideClick(closeSearch);

  const inputRef = useRef<HTMLInputElement>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const search = useSearchProducts();

  const handleSearchClick = () => {
    if (!inputRef.current) return;
    if (!inputRef.current.value) return;
    search(inputRef.current.value);
    closeSearch();
  };

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const checkFocus = () => {
      if (!inputRef.current) return;
      if (
        inputRef.current !== document.activeElement &&
        buttonRef.current !== document.activeElement
      ) {
        closeSearch();
      }
    };

    Object.keys(window).forEach((key) => {
      if (/^on/.test(key)) {
        window.addEventListener(key.slice(2), checkFocus);
      }
    });

    return () => {
      Object.keys(window).forEach((key) => {
        if (/^on/.test(key)) {
          window.removeEventListener(key.slice(2), checkFocus);
        }
      });
    };
  }, []);

  useEffect(() => {
    const checkForSubmit = (evt: any) => {
      if (evt.key !== "Enter") return;
      if (document.activeElement !== inputRef.current) return;
      handleSearchClick();
    };

    document.addEventListener("keydown", checkForSubmit);

    return () => document.addEventListener("keydown", checkForSubmit);
  }, []);

  return (
    <motion.div
      initial={{ y: "-10vh" }}
      animate={{ y: 0 }}
      exit={{ y: "-10vh" }}
      transition={{ bounce: 0 }}
      className={`absolute left-0 right-0 md:!hidden px-6 py-3 bg-gray-700`}
      ref={searchRef}
    >
      <div
        id="mobileSearchBar"
        className="flex flex-[2] border-2 justify-end border-gray-700 rounded-sm h-9 focus-within:border-blue-500 bg-gray-500"
      >
        <input
          ref={inputRef}
          type="text"
          className="py-3 pl-5 w-full outline-none text-base bg-gray-500 text-gray-100"
          placeholder="Search"
          autoFocus
        />
      </div>
    </motion.div>
  );
};
