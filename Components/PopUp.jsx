import React from "react";

const PopUp = ({
  title,
  setOpenModal,
  getDonations,
  donate,
  donateFunction,
}) => {
  return (
    <>
      <div className="justify-center items center flex overflow-x-hidden overflow-y-auto inset-0 fixed z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/* contents */}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"></div>
        </div>
      </div>
    </>
  );
};

export default PopUp;
