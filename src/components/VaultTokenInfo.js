import React from "react";
import { Item, Modal, Header, Button } from "semantic-ui-react";
import ERCTokenInfo from "./ERCTokenInfo";

export default function VaultTokenInfo(props) {
  console.log("props.token.assetObject");
  console.log(props.token.assetObject);

  function deposit(amount, to) {
    props.token.deposit(50000000000, props.acct);
  }

  return (
    <div>
      <Header>Asset Token: {props.token.asset}</Header>
      <Header>Manager: {props.token.manager}</Header>
      {props.token.assetObject && (
        <ERCTokenInfo token={props.token.assetObject} />
      )}
      <Button onClick={deposit}>Deposit</Button>
      {/* <Header>{props.token.symbol()}</Header> */}
    </div>
  );
}
