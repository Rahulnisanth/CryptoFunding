import React, { useState } from "react";
import { Icon } from "../Components/index";
import { Arrow } from "../Components/index";

// Hero Component />
const Hero = ({ titleData, createCampaign }) => {
  const [campaign, setCampaign] = useState({
    title: "",
    description: "",
    amount: "",
    deadline: "",
  });

  const createNewCampaign = async (e) => {
    e.preventDefault();
    try {
      const data = await createCampaign(campaign);
      console.log("The form Data =>>", data);
    } catch (error) {
      console.log("Error during campaign creation :", error);
    }
  };
  return (
    <>
      <div className="relative">
        <span className="coverLine"></span>
        <img
          src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
          className="absolute inset-0 object-cover w-full h-full"
          alt=""
        />
        <div className="relative bg-opacity-75 backgroundMain">
          <Icon />
          <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-16">
            <div className="flex flex-col items-center justify-between xl:flex-row">
              <div className="w-full max-w-xl mb-12 -mt-10 xl:mb-0 xl:pr-6 xl:w-7/12 lg:-mt-10">
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-5xl sm-leading-none">
                  <span className="max-w-lg mb-6 font-sans text-4xl font-bold tracking-tight text-white sm:text-5xl sm-leading-none uppercase">
                    CryptoFundze.
                  </span>
                  <br className="hidden md:block" /> The Funding dApp
                </h2>
                <p className="max-w-xl text-justify text-base mb-4 text-gray-200 md:text-lg">
                  Our Crypto Fundze DApp enables campaign creators to raise
                  funds directly from a decentralized pool of investors without
                  the need for intermediaries.
                </p>
                <a
                  href="https://www.blockchain.com/"
                  aria-label="learn more"
                  className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-accent-400 hover:text-teal-accent-700 text-gray-200"
                >
                  Learn more
                  <Arrow />
                </a>
              </div>

              <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                  <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                    Create Campaign here
                  </h3>
                  <form onSubmit={createNewCampaign}>
                    {/* Title field */}
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="title"
                        className="inline-block mb-1 font-medium"
                      >
                        Title
                      </label>
                      <input
                        id="title"
                        name="title"
                        onChange={(e) => {
                          setCampaign({ ...campaign, title: e.target.value });
                        }}
                        placeholder="Title"
                        required
                        type="text"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rou ded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    {/* Description field */}
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="description"
                        className="inline-block mb-1 font-medium"
                      >
                        Description
                      </label>
                      <input
                        id="description"
                        name="description"
                        onChange={(e) => {
                          setCampaign({
                            ...campaign,
                            description: e.target.value,
                          });
                        }}
                        placeholder="Description"
                        required
                        type="text"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rou ded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    {/* Target amount */}
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="amount"
                        className="inline-block mb-1 font-medium"
                      >
                        Target
                      </label>
                      <input
                        id="amount"
                        name="amount"
                        onChange={(e) => {
                          setCampaign({ ...campaign, amount: e.target.value });
                        }}
                        placeholder="Target Amount"
                        required
                        type="text"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rou ded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    {/* Deadline date field */}
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="deadline"
                        className="inline-block mb-1 font-medium"
                      >
                        Deadline
                      </label>
                      <input
                        id="deadline"
                        name="deadline"
                        onChange={(e) => {
                          setCampaign({
                            ...campaign,
                            deadline: e.target.value,
                          });
                        }}
                        placeholder="Deadline"
                        required
                        type="date"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rou ded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mt-4 mb-2 sm:mb-4">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center items-center h-12 p-6 font-medium uppercase tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-40 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none background"
                      >
                        Initialize
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 sm:text-sm">
                      * Create your campaign to raise funds
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
