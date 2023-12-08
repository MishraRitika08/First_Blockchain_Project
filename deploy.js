const { ethers } = require("ethers");
const fs = require("fs-extra");

async function deployContract() {
    try {
        const provider = new ethers.providers.JsonRpcProvider(
            "HTTP://127.0.0.1:7545"
        );

        const wallet = new ethers.Wallet(
            "0xef27b5afed608f3ef3fba844713fbc5cb1cc914029cd07375f5dac2a1214eca6",
            provider
        );

        // Read the bytecode & ABI from the Truffle-generated JSON file
        const contractData = JSON.parse(
            fs.readFileSync('./build/contracts/PeopleProfile.json', 'utf8')
        );
        const bytecode = contractData.bytecode;
        const abi = contractData.abi;

        console.log('Bytecode:', bytecode);

        // Create a Contract Factory
        const contractFactory = new ethers.ContractFactory(abi, bytecode, wallet);

        // Deploy the Contract
        const deployedContract = await contractFactory.deploy();

        // Wait for contract deployment transaction to be mined
        await deployedContract.deployed();

        // Log deployed contract address
        console.log("Contract deployed at address:", deployedContract.address);

        // Other operations with deployed contract can be performed here
    } catch (error) {
        console.error("Contract deployment error:", error);
    }
}

deployContract()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Deployment error:", error);
        process.exit(1);
    });
