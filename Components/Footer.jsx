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
    <footer className="backgroundMain py-8 px-5 flex flex-wrap justify-center align-center text-center lg:justify-between">
      <p className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-40">
        © CryptoFundze {new Date().getFullYear()} - Developed by{" "}
        <a
          className="transition-colors duration-200 hover:text-green-500"
          href="https://www.linktr.ee/Rahulnisanth"
        >
          Rahulnisanth
        </a>
      </p>
      <div className="flex justify-center items-end mt-4 text-white md:space-x-6 md:mt-1 md:text-lg lg:text-2xl space-x-6 lg:mt-0">
        <a
          className="transition-colors duration-200 hover:text-green-500"
          href="https://www.linkedin.com/in/rahul-nisanth"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>

        <a
          className="transition-colors duration-200 hover:text-green-500"
          href="https://github.com/Rahulnisanth"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>

        <a
          className="transition-colors duration-200 hover:text-green-500"
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGoogle />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
