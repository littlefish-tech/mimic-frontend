const cabi = require("../abi/cabi.json");
const ControllerAddr = "0xdEE7D0f8CcC0f7AC7e45Af454e5e7ec1552E8e4e";

export class Controller {
  constructor(web3) {
    this.provider = web3;
    this.address = ControllerAddr;
    this.controller = new web3.eth.Contract(cabi, ControllerAddr);
    this.expired = false;
  }

  async hasExpired(a) {
    let isExpired = false;
    await this.controller.methods.hasExpired(a).call(function (error, result) {
      isExpired = result;
    });
    return isExpired;
  }
  setExpired(b) {
    this.expired = b;
  }
}
