const abi = require("../abi/erc20abi.json");

// the parent class for all erc20 objects

export class ERC20 {
  constructor(web3, address) {
    this.address = address;
    this.tName = "";
    this.tSymbol = "";
    this.myBalance = -1;
    this.totalSupply = -1;
    this.erc = new web3.eth.Contract(abi, address);
  }
  async getName() {
    let name = "";
    await this.erc.methods.name().call(function (error, result) {
      name = result;
    });
    // this.erc.methods.symbol().call(function (error, result) {
    //   this.tSymbol = result;
    // });
    return name;
  }
  setName(n) {
    this.tName = n;
  }

  // return the token name
  name() {
    return this.tName;
  }

  symbol() {
    return this.tSymbol;
  }

  async getBalance(addr) {
    let b = 0;
    await this.erc.methods.balanceOf(addr).call(function (error, result) {
      b = result;
    });
    return b;
  }
  setBalance(b) {
    this.myBalance = parseInt(b);
  }

  totalSupply() {
    this.erc.methods.totalSupply().call(function (error, result) {
      return result;
    });
  }

  async updateTotalSupply() {
    let s = 0;
    await this.erc.methods.totalSupply().call(function (error, result) {
      s = result;
    });
    return s;
  }
  setTotalSupply(s) {
    this.totalSupply = parseInt(s);
  }
  async approve(c, a, f) {
    let r = await this.erc.methods
      .approve(c, a)
      .send({ from: f })
      .on("receipt", function (receipt) {
        console.log("approve receipt " + receipt);
      });
    return r;
  }
}
