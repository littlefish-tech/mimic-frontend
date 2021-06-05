import React from "react";
import { VaultToken } from "./VaultToken";
import Web3 from "web3";
const abi = require("../abi/vtAbi.json");

let web3 = new Web3(
  Web3.givenProvider || "ws://some.local-or-remote.node:8546"
);

export default function VaultContract() {
  return <div>*</div>;
}
