const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require("hardhat");

describe("Game5", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();

    return { game };
  }
  it("should be a winner", async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // good luck
    const { Wallet } = require("ethers");

    const threshold = BigInt("0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf");
    let wallet;
    let addressNum;
    while (true) {
      wallet = Wallet.createRandom();
      addressNum = BigInt(wallet.address);
      if (addressNum < threshold) {
        break;
      }
    }
    wallet = wallet.connect(ethers.provider);
    const signer = ethers.provider.getSigner(0);
    await signer.sendTransaction({
      to: wallet.address,
      value: ethers.utils.parseEther("69"),
    });
    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
