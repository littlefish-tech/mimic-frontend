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
    this.vaultBalance = -1;
    // an erc20 object corresponding to my asset token
    this.assetObject = null;
    this.manageToken = false;
    this.expireTime = -1;
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

  deposit(amount, f) {
    console.log("amt  " + amount);
    this.assetObject.approve(this.address, amount, f).then((result) => {
      console.log("approve result +");
      console.log(result);
    });
    this.vt.methods["deposit"](amount)
      .send({ from: f })
      .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error, receipt) {
        console.log(error);
      });
  }

  withdraw(amount, f) {
    console.log("amt  " + amount);
    this.assetObject.approve(this.address, amount, f).then((result) => {
      console.log("approve result +");
      console.log(result);
    });
    this.vt.methods["withdraw"](amount)
      .send({ from: f })
      .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error, receipt) {
        console.log(error);
      });
  }

  setVaultBalance(amount) {
    this.vaultBalance = parseInt(amount);
  }

  initialize(amount, f) {
    this.assetObject.approve(this.address, amount, f).then((result) => {
      console.log("approve result +");
      console.log(result);
    });
    this.vt.methods["initializeRatio"](amount)
      .send({ from: f })
      .on("receipt", function (receipt) {
        console.log(receipt);
      })
      .on("error", function (error, receipt) {
        console.log(error);
      });
  }

  findWithdrawalWindowActivated() {
    return this.vt.getPastEvents("WithdrawalWindowActivated", {
      fromBlock: 0,
      toBlock: "latest",
    });
  }
}
