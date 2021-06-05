import React from "react";
import { Item, Modal, Header } from "semantic-ui-react";

export default function ERCTokenInfo(props) {
  console.log("at ercinfo");
  console.log(props);
  return (
    <div>
      <Header>{props.token.name()}</Header>
      <Header>Balance: {props.token.myBalance}</Header>
      <Header>Total Supply: {props.token.totalSupply}</Header>
      {/* <Header>{props.token.symbol()}</Header> */}
    </div>
  );
}
