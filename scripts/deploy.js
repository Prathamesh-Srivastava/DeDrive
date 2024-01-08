const hre = require("hardhat");

async function main() {
    const Drive = await hre.ethers.deployContract("Drive");
    console.log(`Deployed contract at ${Drive.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//0x5FbDB2315678afecb367f032d93F642f64180aa3
