import React from "react";
import { Item, Modal, Header } from "semantic-ui-react";
import ERCTokenInfo from "./ERCTokenInfo";

export default function VaultTokenInfo(props) {
  console.log("props.token.assetObject");
  console.log(props.token.assetObject);
  return (
    <div>
      <Header>Asset Token: {props.token.asset}</Header>
      <Header>Manager: {props.token.manager}</Header>
      {props.token.assetObject && (
        <ERCTokenInfo token={props.token.assetObject} />
      )}
      {/* <Header>{props.token.symbol()}</Header> */}
    </div>
  );
}
