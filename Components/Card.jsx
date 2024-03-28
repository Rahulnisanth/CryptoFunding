import React from "react";

const Card = ({ title, allCampaigns, setOpenModal, setDonate }) => {
  const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
    return remainingDays.toFixed(0);
  };

  return (
    <div className="px-6 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-4 lg:px-8 lg:py-20">
      <p className="py-10 text-2xl font-bold leading-5 lg:text-4xl md:text-3xl">
        {title}
      </p>
      <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {allCampaigns?.map((campaign, i) => {
          return (
            <div
              onClick={() => {
                setDonate(campaign);
                setOpenModal(true);
              }}
              key={i}
              className="cursor-pointer border overflow-hidden transition-shadow duration-300 bg-white rounded"
            >
              <img
                src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                className="object-cover h-67 w-full rounded"
                alt="card image"
              />
              <div className="py-5 px-4">
                <p className="mb-2 text-xs font-semibold text-gray-600 uppercase">
                  {daysLeft(campaign.deadline)} Days Left
                </p>
                <a
                  href="/"
                  className="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
                >
                  <p className="text-xl font-bold leading-5">
                    {campaign.title}
                  </p>
                </a>
                <p className="text-justify mb-4 text-gray-700">
                  {campaign.description}
                </p>
                <div className="flex justify-between space-x-4">
                  <p className="font-semibold">Target {campaign.target}</p>
                  <p className="font-semibold">
                    Raised {campaign.amountCollected} ETH
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
