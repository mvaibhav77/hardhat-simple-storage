const { ethers, run, network } = require("hardhat");

const main = async () => {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying Contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await SimpleStorageFactory.getDeployTransaction();
  console.log(`Deployed contract to : ${simpleStorage.target}`);
  // console.log(network.config);
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for 6 block confirmation");
    await simpleStorage.deploymentTransaction().wait(6);
    console.log("^6^ block confirmed");
    await verify(simpleStorage.target, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current Value is: ${currentValue}`);

  // updating current value
  const transactionResponse = await simpleStorage.store(77);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated value: ${updatedValue}`);
};

const verify = async (contractAddress, args) => {
  console.log("Verifying Contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArgument: args,
    });
  } catch (error) {
    console.log(error);
  }
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
