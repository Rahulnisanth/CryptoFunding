// Contract deployment: CrowdFunding
// Contract address:    0x5fbdb2315678afecb367f032d93f642f64180aa3
// Transaction:         0x076c037b3822b08e8b0d964760bf34f537c0056c66ba20515bd6738c28f14374
// From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
// Value:               0 ETH
// Gas used:            1342563 of 1342563
// Block #1:            0x94fd8ac1d65b19359df4e13e10b8bdffa5f891f4e1b19db0f255f292d8bbe8b6

// const hre = require("hardhat");

// async function main() {
//   const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
//   const crowdFunding = await CrowdFunding.deploy();

//   await crowdFunding.deployed();

//   console.log(`crowdFunding deployed to ${crowdFunding.address}`);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

async function main() {
  const CrowdFunding = await ethers.getContractFactory("CrowdFunding");
  const crowdFunding = await CrowdFunding.deploy();

  console.log("Contract deployed to address:", crowdFunding.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
