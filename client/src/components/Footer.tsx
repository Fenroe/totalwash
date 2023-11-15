import React from "react";
import { RxGithubLogo, RxLinkedinLogo } from "react-icons/rx";

export const Footer = () => {
  return (
    <footer className="bg-gray-700 h-28 mt-auto w-screen max-w-full flex items-center justify-center">
      <div className="px-3 h-20 max-w-xs w-screen flex items-center text-4xl justify-between text-gray-100 gap-3">
        <a href="https://github.com/Fenroe/totalwash">
          <RxGithubLogo />
        </a>
        <a href="https://davidslade.dev/">
          <img src="/portfolio-logo-dark.svg" className="h-8 aspect-square" />
        </a>
        <a href="https://www.linkedin.com/in/david-slade-b0a90618a/">
          <RxLinkedinLogo />
        </a>
      </div>
    </footer>
  );
};
