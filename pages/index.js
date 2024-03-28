import React, { useState, useEffect, useContext } from "react";
import { CrowdFundingContext } from "../Context/CrowdFunding";
import { Hero, Card, PopUp } from "../Components/index";

const Index = () => {
  // console.log(useContext(CrowdFundingContext));
  const {
    titleData,
    getCampaigns,
    createCampaign,
    donate,
    getUserCampaigns,
    getDonations,
  } = useContext(CrowdFundingContext);

  const [allCampaigns, setAllCampaigns] = useState([]);
  const [userCampaigns, setUserCampaigns] = useState([]);
  //Modal manure >>>
  const [openModal, setOpenModal] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getCampaigns();
        const userData = await getUserCampaigns();
        console.log("All campaigns >>> ", allData);
        console.log("User campaigns >>> ", userData);
        setAllCampaigns(allData);
        setUserCampaigns(userData);
      } catch (error) {
        console.error("Error fetching campaign data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Hero titleData={titleData} createCampaign={createCampaign} />
      {allCampaigns && (
        <Card
          title="Overall Campaigns"
          allCampaigns={allCampaigns}
          setOpenModal={setOpenModal}
          setDonate={setDonateCampaign}
        />
      )}
      {userCampaigns && (
        <Card
          title="Your Campaigns"
          allCampaigns={userCampaigns}
          setOpenModal={setOpenModal}
          setDonate={setDonateCampaign}
        />
      )}
      {openModal && donateCampaign && (
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

export default Index;
