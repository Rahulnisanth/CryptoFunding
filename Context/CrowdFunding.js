import React, { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { CrowdFundingABI, CrowdFundingAddress } from "./contents";

//Fetching the contracts :
const fetchContract = (signerOrProvider) => {
  return new ethers.Contract(
    CrowdFundingAddress,
    CrowdFundingABI,
    signerOrProvider
  );
};

export const CrowdFundingContext = createContext();

export const CrowdFundingProvider = ({ children }) => {
  const titleData = "CrowdFunding contract!";
  const [currentAccount, setCurrentAccount] = useState("");

  // CREATE CAMPAIGN FUNCTION ==>
  const createCampaign = async (campaign) => {
    const { title, description, amount, deadline } = campaign;
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    console.log(currentAccount);

    try {
      const transaction = await contract.createCampaign(
        currentAccount,
        title,
        description,
        ethers.utils.parseUnits(amount, 18),
        new Date(deadline).getTime()
      );
      await transaction.wait();
      console.log("Transaction successful :", transaction);
    } catch (e) {
      console.log("Transaction un-successful :", e);
    }
  };

  // GET CAMPAIGN FUNCTION ==>
  const getCampaigns = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);
    const campaigns = await contract.getCampaigns();
    const parsedCampaign = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected),
      pId: i,
    }));
    return parsedCampaign;
  };

  // GET SIGNED USER CAMPAIGNS ==>
  const getUserCampaigns = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);
    const allCampaigns = await contract.getCampaigns();
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    const currentUser = accounts[0];
    const filteredCampaigns = allCampaigns.filter(
      (campaign) =>
        campaign.owner === "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
    );
    const userCampaign = filteredCampaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected),
      pId: i,
    }));
    return userCampaign;
  };

  // DONATION FUNCTION ==>
  const donate = async (pId, amount) => {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    try {
      const campaignData = await contract.donateToCampaign(pId, {
        value: ethers.utils.parseEther(amount),
      });
      await campaignData.wait();
      console.log("Donation successful");
      // Instead of reloading, consider updating UI state
    } catch (e) {
      console.log("Donation failed:", e);
    }
  };

  // GET THE DONATIONS FUNCTION ==>
  const getDonations = async (pId) => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);
    const donations = await contract.getDonations(pId);
    const parsedDonations = donations.map((donation) => ({
      donor: donation.donor,
      amount: ethers.utils.formatEther(donation.amount),
    }));
    return parsedDonations;
  };

  // INVOKE USER TO CONNECT THE WALLET :
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) {
        console.log("Please install your MetaMask wallet!");
        return;
      }
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No account found after Ethereum has connected!!!");
      }
    } catch (e) {
      console.log("Error occurred during wallet connection:", e);
    }
  };

  // useEffect invoking...
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  // CONNECTING WALLET FUNCTION ==>
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        console.log("Please install MetaMask!!");
        return;
      }
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (e) {
      console.log("Error occurred:", e);
    }
  };

  // CROWDFUNDING PROVIDER RETURN STATEMENT :
  return (
    <CrowdFundingContext.Provider
      value={{
        titleData,
        currentAccount,
        createCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        connectWallet,
      }}
    >
      {children}
    </CrowdFundingContext.Provider>
  );
};
