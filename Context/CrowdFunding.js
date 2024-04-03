import React, { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { CrowdFundingABI, CrowdFundingAddress } from "./contents";

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
  const [web3Modal, setWeb3Modal] = useState(null);

  useEffect(() => {
    // Instantiate Web3Modal when running in the browser
    if (typeof window !== "undefined") {
      const modal = new Web3Modal();
      setWeb3Modal(modal);
    }
  }, []);

  const getProviderAndSigner = async () => {
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    return { provider, signer };
  };

  const createCampaign = async (campaign) => {
    try {
      const { title, description, amount, deadline } = campaign;
      const { signer } = await getProviderAndSigner();
      const contract = fetchContract(signer);
      const overrides = {
        value: ethers.BigNumber.from("0"),
      };
      const transaction = await contract.createCampaign(
        currentAccount,
        title,
        description,
        ethers.utils.parseUnits(amount, 18),
        new Date(deadline).getTime(),
        overrides
      );
      await transaction.wait();
      console.log("Transaction successful :", transaction);
    } catch (e) {
      console.log("Transaction un-successful:", e);
    }
  };

  const getCampaigns = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const campaigns = await contract.getAllCampaigns();
      const parsedCampaign = campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(campaign.amountCollected),
        pId: i,
      }));
      console.log("Parsed campaigns => ", parsedCampaign);
      return parsedCampaign;
    } catch (error) {
      console.error("Error fetching campaign data:", error);
      return [];
    }
  };

  const getUserCampaigns = async () => {
    try {
      if (!window.ethereum) {
        console.log("Please install your MetaMask wallet!");
        return [];
      }
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const currentUser = accounts[0];
      if (!currentUser) {
        console.log("No Ethereum account found!");
        return [];
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = fetchContract(provider);
      const allCampaigns = await contract.getAllCampaigns();
      const userCampaigns = allCampaigns
        .filter((campaign) => campaign.owner === currentUser)
        .map((campaign, i) => ({
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.utils.formatEther(campaign.target),
          deadline: campaign.deadline.toNumber(),
          amountCollected: ethers.utils.formatEther(campaign.amountCollected),
          pId: i,
        }));
      return userCampaigns;
    } catch (error) {
      console.error("Error fetching user campaigns:", error);
      return [];
    }
  };

  const donate = async (pId, amount) => {
    try {
      const { signer } = await getProviderAndSigner();
      const contract = fetchContract(signer);
      const campaignData = await contract.donateToCampaign(pId, {
        value: ethers.utils.parseEther(amount),
      });
      await campaignData.wait();
      console.log("Donation successful");
    } catch (e) {
      console.log("Donation failed:", e);
    }
  };

  const getDonations = async (pId) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const donations = await contract.getDonations(pId);
      const parsedDonations = donations.map((donation) => ({
        donor: donation.donor,
        amount: ethers.utils.formatEther(donation.amount),
      }));
      return parsedDonations;
    } catch (error) {
      console.error("Error fetching donations:", error);
      return [];
    }
  };

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

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

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
