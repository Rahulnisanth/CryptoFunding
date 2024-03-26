import React from "react";
import {
  FaYoutube,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaFacebook,
  FaGoogle,
  FaInstagram,
} from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="backgroundMain py-8 px-5 flex flex-wrap justify-between">
      <p className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-40">
        © 2024 Crypto Fundze, Inc. All rights reserved.
      </p>
      <div className="flex justify-center items-end mt-4 text-white md:space-x-6 md:mt-1 md:text-lg lg:text-2xl space-x-6 lg:mt-0">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          <FaGoogle />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
