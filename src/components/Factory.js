import { VaultToken } from "./VaultToken";

const abi = require("../abi/factoryabi.json");

export class Factory {
  constructor(web3, address) {
    this.provider = web3;
    this.address = address;
    this.factory = new web3.eth.Contract(abi, address);
  }

  deployNewVT(
    tokenName,
    tokenSymble,
    controllerAddr,
    uniswapAddr,
    assetTokenAddr
  ) {
    this.factory.methods["deployNewVaultToken"](
      tokenName,
      tokenSymble,
      controllerAddr,
      uniswapAddr,
      assetTokenAddr
    )
      .on("receipt", function (receipt) {
        return receipt;
      })
      .on("error", function (error, receipt) {
        console.log(error);
      });
  }
  findAllVT() {
    return this.factory.getPastEvents("NewVaultToken", {
      fromBlock: 0,
      toBlock: "latest",
    });
  }
}
// module.exports = Factory;
