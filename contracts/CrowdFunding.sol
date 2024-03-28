// SPDX-License-Identifier: MIT
pragma solidity >=0.8.18;

// Define the contract CryptoFunze
contract CrowdFunding {
    // Define a struct to represent a campaign
    struct Campaign {
        address owner; // Address of the campaign owner
        string title; // Title of the campaign
        string description; // Description of the campaign
        uint target; // Target amount to be collected
        uint deadline; // Deadline for the campaign
        uint amountCollected; // Amount collected so far
        address[] donars; // Array to store addresses of donors
        uint[] donations; // Array to store donation amounts
    }

    // Mapping to store campaigns with their IDs
    mapping(uint => Campaign) public campaigns;

    // Variable to keep track of total campaigns created
    uint totalCampaigns = 0;

    // Function to create a new campaign
    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint _target,
        uint _deadline
    ) public returns (uint) {
        // Retrieve the storage reference of the campaign
        Campaign storage campaign = campaigns[totalCampaigns];

        // Ensure that the campaign deadline is in the future
        require(
            _deadline > block.timestamp,
            "The Deadline of the campaign should be in future!!"
        );

        // Initialize campaign details
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;

        // Increment total campaigns count and return the campaign ID
        totalCampaigns++;
        return totalCampaigns - 1;
    }

    // Function to allow users to donate to a campaign
    function donateToCampaign(uint _id) public payable {
        // Get the donation amount
        uint amount = msg.value;

        // Retrieve the storage reference of the campaign
        Campaign storage campaign = campaigns[_id];

        // Add the donor and donation amount to the respective arrays
        campaign.donars.push(msg.sender);
        campaign.donations.push(amount);

        // Transfer the donated amount to the campaign owner
        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        // If transfer is successful, update the amount collected for the campaign
        if (sent) {
            campaign.amountCollected += amount;
        }
    }

    // Function to retrieve donors and their donations for a campaign
    function getDonars(
        uint _id
    ) public view returns (address[] memory, uint[] memory) {
        return (campaigns[_id].donars, campaigns[_id].donations);
    }

    // Function to retrieve details of all campaigns
    function getAllCampaigns() public view returns (Campaign[] memory) {
        // Initialize an array to store all campaigns
        Campaign[] memory allCampaigns = new Campaign[](totalCampaigns);

        // Iterate through each campaign and copy it to the array
        for (uint i = 0; i < totalCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        // Return the array containing all campaigns
        return allCampaigns;
    }
}
