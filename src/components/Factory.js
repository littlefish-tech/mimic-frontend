import { VaultToken } from "./VaultToken";

const abi = require("../abi/factoryabi.json");
const factoryContractAddr = "0xB2438FE65b37c633d6664cCE983b731A92dc1449";

export class Factory {
  constructor(web3) {
    this.provider = web3;
    this.address = factoryContractAddr;
    this.factory = new web3.eth.Contract(abi, factoryContractAddr);
  }

  // function deployNewVaultToken(string memory _name, string memory _symbol,
  // address _controller, address _asset, uint256 _maximumAssets) external {

  // add the 10e18 to the frontend
  deployNewVT(tokenName, tokenSymble, controllerAddr, assetTokenAddr, f) {
    let amount = this.provider.utils.toWei("10", "ether");

    this.factory.methods["deployNewVaultToken"](
      tokenName,
      tokenSymble,
      controllerAddr,
      assetTokenAddr,
      amount
    )
      .send({ from: f })
      .on("receipt", function (receipt) {
        console.log(receipt);
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
