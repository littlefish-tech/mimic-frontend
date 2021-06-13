import { VaultToken } from "./VaultToken";

const abi = require("../abi/factoryabi.json");
const factoryContractAddr = "0xa7CD2F79F9aebc0E0fe9bd33Ebf3ce9bD1eBE20c";

export class Factory {
  constructor(web3) {
    this.provider = web3;
    this.address = factoryContractAddr;
    this.factory = new web3.eth.Contract(abi, factoryContractAddr);
  }

  // function deployNewVaultToken(string memory _name, string memory _symbol,
  // address _controller, address _asset, uint256 _maximumAssets) external {

  // add the 10e18 to the frontend
  deployNewVT(
    tokenName,
    tokenSymble,
    controllerAddr,
    assetTokenAddr,
    amount,
    f
  ) {
    return this.factory.methods["deployNewVaultToken"](
      tokenName,
      tokenSymble,
      controllerAddr,
      assetTokenAddr,
      amount
    ).send({ from: f });
  }
  findAllVT() {
    return this.factory.getPastEvents("NewVaultToken", {
      fromBlock: 0,
      toBlock: "latest",
    });
  }
}
// module.exports = Factory;
