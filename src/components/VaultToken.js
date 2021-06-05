import { ERC20 } from "./Erc20";
const vtabi = require("../abi/vtAbi.json");

// create a vault token class and inherent ERC 20 class
export class VaultToken extends ERC20 {
  constructor(web3, address) {
    super(web3, address);
    this.vt = new web3.eth.Contract(vtabi, address);
    this.manager = "";
    this.asset = "";
    this.status = false;
    this.assetObject = null;
  }
  // return the manager address
  async getManager() {
    let manager = "";
    await this.vt.methods.manager().call(function (error, result) {
      manager = result;
    });
    return manager;
  }
  setManager(a) {
    this.manager = a;
  }

  async symbol() {
    let symbol = "";
    await this.vt.methods.symbol().call(function (error, result) {
      console.log(result);
      symbol = result;
    });
    return symbol;
  }

  // asset is the contract address of an ERC20 token that can be used to buy or sell this vault token

  async getAsset() {
    let asset = "";
    await this.vt.methods.asset().call(function (error, result) {
      asset = result;
    });
    return asset;
  }
  setAsset(a) {
    this.asset = a;
  }

  updateStatus() {
    if (
      this.manager !== "" &&
      this.tName !== "" &&
      this.myBalance !== -1 &&
      this.asset !== "" &&
      this.assetObject !== null
    ) {
      this.status = true;
    }
  }
}
