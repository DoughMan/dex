const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DoughnutRouter testing", () => {

    //constants
    const doughnutRouterAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
    const cakeTokenAddress = "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82";
    const wbnbTokenAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
    const uniTokenAddress = "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1";
    const linkTokenAddress = "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD";

    //variables
    let doughnut;

    beforeEach("deploy contract before each test", async () => {
        const accounts = await ethers.getSigners();
        owner = accounts[0];
        const DoughnutContract = await ethers.getContractFactory("Doughnut");
        doughnut = await DoughnutContract.deploy(doughnutRouterAddress);
        await doughnut.deployed();
        console.log('Doughnut exchange deployed at address: ${doughnut.address}');
    })

    //it("Should SWAP BNB for CAKE", async () => {
    //    const bnb_cake_swap_tx = await doughnut.connect(owner).swapExactBNBForTokens(
    //      0,
    //      cakeTokenAddress,
    //      {value: ethers.utils.parseEther("500")}
    //    )
    //    console.log(bnb_cake_swap_tx);
    //});

    //it("Should SWAP exact CAKE for LINK", async () => {
    //  const cakeToken = new ehters.Contract(cakeTokenAddress, ("function approve(address _spender, uint256 _value) public returns (boot success)"), owner);
    //  await cakeToken.connect(owner).approve(doughnut.address, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    //  const cake_link_swap_tx = await doughnut.connect(owner).swapExactTokensForTokens(
    //    ethers.utils.parseEther("5000"),
    
// ADDING LIQUIDITY-----------------------------------------------------------------------//

it("Should addLiquidityBNB for CAKE/BNB", async () => {
    const cakeToken = new ethers.Contract(cakeTokenAddress, ["function approve(address _spender, uint256 _value) public returns (bool success)"], owner);
    const approveTx = await cakeToken.connect(owner).approve(doughnut.address, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    await approveTx.wait();

    const amountOfBNBForCake = await doughnut.getAmountOfBForTokenA(cakeTokenAddress, wbnbTokenAddress, ethers.utils.parseEther("5000")); //for 1000 cake tokens I have to also add ... WBNB
    console.log("amountOfBNBForCake: ", parseInt(amountOfBNBForCake) / Math.pow(10, 18));
    
    const add_liquity_tx = await doughnut.connect(owner).addliquidityBNB(cakeTokenAddress, ethers.utils.parseEther("5000"), {value: amountOfBNBForCake, gasLimit: 800000});
    console.log(add_liquity_tx);
    });
})