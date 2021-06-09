const addressabi = require("../abi/ab.json");
const AddressBookAddr = "0x8812f219f507e8cfe9d2f1e790164714c5e06a73";

export class AddressBook {
  constructor(web3) {
    this.provider = web3;
    this.address = AddressBookAddr;
    this.addressBook = new web3.eth.Contract(addressabi, AddressBookAddr);
    this.marginPoolAddress = "";
  }

  async getMarginPool() {
    let mpAddr = "";
    await this.addressBook.methods
      .getMarginPool()
      .call(function (error, result) {
        mpAddr = result;
      });
    return mpAddr;
  }
  setMarginPool(m) {
    this.marginPoolAddress = m;
  }
}
