import React, { useState, useEffect, useContext } from "react";
import { CrowdFundingContext } from "../Context/CrowdFunding";
import { Hero, Card, PopUp } from "../Components/index";

const index = () => {
  const {
    titleData,
    getCampaigns,
    createCampaign,
    donate,
    getUserCampaigns,
    getDonations,
  } = useContext(CrowdFundingContext);

  // Over-all & Signer campaigns management />
  const [allCampaigns, setAllCampaigns] = useState();
  const [userCampaigns, setUserCampaigns] = useState();
  // Rendering data from the back-end modal asynchronously />
  useEffect(() => {
    const allCampaignsData = getCampaigns();
    const userCampaignsData = getUserCampaigns();
    return async () => {
      const allData = await allCampaignsData;
      const userData = await userCampaignsData;
      setAllCampaigns(allData);
      setUserCampaigns(userData);
    };
  }, []);

  // donation state management />
  const [openModal, setOpenModal] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState();
  // console.log(donateCampaign);
  // final return statement -> index () />
  return (
    <>
      <Hero titleData={titleData} createCampaign={createCampaign} />
      {/* Cards of overall campaigns of the dApp */}
      <Card
        title="All campaigns of the web"
        allCampaigns={allCampaigns}
        setOpenModal={setOpenModal}
        setDonate={setDonateCampaign}
      />
      {/* Card of the campaigns created by the signed user of the dApp */}
      <Card
        title="Signer campaigns"
        allCampaigns={userCampaigns}
        setOpenModal={setOpenModal}
        setDonate={setDonateCampaign}
      />
      {/* Popup for the donations */}
      {openModal && (
        <PopUp
          title="Popup"
          setOpenModal={setOpenModal}
          getDonations={getDonations}
          donate={donateCampaign}
          donateFunction={donate}
        />
      )}
    </>
  );
};

export default index;
