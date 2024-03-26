import React, { useState, useEffect, useContext } from "react";
import { CrowdFundingContext } from "../Context/CrowdFunding";
import { Menu, Logo, Close } from "../Components/index";
const NavBar = () => {
  const { currentAccount, connectWallet } = useContext(CrowdFundingContext);
  const [menuOpen, setIsMenuOpen] = useState(false);
  const menuList = ["About", "Project", "Donation", "Members"];
  return (
    <div className="backgroundMain">
      <div className="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <a
              href="/"
              aria-label="company"
              title="company"
              className="inline-flex items-center mr-8"
            >
              <Logo color={"text-white"} />
              <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">
                CryptoFundze
              </span>
            </a>
            <ul className="flex items-center ml-8 hidden space-x-8 lg:flex">
              {menuList.map((item, i) => {
                return (
                  <li key={i}>
                    <a
                      href="/"
                      aria-label="products"
                      title="products"
                      className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-40"
                    >
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          {!currentAccount && (
            <ul className="flex items-center hidden space-x-8 lg:flex">
              <li>
                <button
                  onClick={() => connectWallet()}
                  className="inline-flex justify-center items-center h-12 p-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-40 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none background"
                  aria-label="sign-in"
                >
                  Connect Wallet
                </button>
              </li>
            </ul>
          )}
          <div className="lg:hidden z-40">
            <button
              className="p-2 mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              aria-label="open menu"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu />
            </button>
            {menuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <a
                        href="/"
                        aria-label="mobile-menu"
                        className="inline-flex items-center"
                      >
                        <Logo color={"text-black"} />
                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-700 uppercase">
                          CryptoFundze
                        </span>
                      </a>{" "}
                      <button
                        aria-label="close menu"
                        title="close menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Close />
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      {menuList.map((item, i) => {
                        return (
                          <li key={i}>
                            <a
                              href="/"
                              aria-label="products"
                              title="products"
                              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                            >
                              {item}
                            </a>
                          </li>
                        );
                      })}
                      <li>
                        <a
                          href="/"
                          aria-label="wallet button"
                          className="inline-flex justify-center items-center h-12 p-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-40 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none background"
                          onClick={() => connectWallet()}
                        >
                          Connect Wallet
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
