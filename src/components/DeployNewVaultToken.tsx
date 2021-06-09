import React, { useEffect, useState } from "react";
import Web3 from "web3";
import {
  Button,
  Dropdown,
  Form,
  Header,
  Input,
  Modal,
  Message,
} from "semantic-ui-react";
import { Factory } from "./Factory";

// import Factory from "../lib/Factory";

// const assetTokenAddr = require("../assetTokenAddr.json");

// let web3 = new Web3(
//   Web3.givenProvider || "ws://some.local-or-remote.node:8546"
// );
let web3 = new Web3(Web3.givenProvider);

const controllerAddr = "0xdee7d0f8ccc0f7ac7e45af454e5e7ec1552e8e4e";

const assetTokenAddrs = [
  {
    key: "1",
    text: "DAI : 0x1528F3FCc26d13F7079325Fb78D9442607781c8C ",
    value: "0x1528F3FCc26d13F7079325Fb78D9442607781c8C",
  },
  {
    key: "2",
    text: "WBTC : 0xe0C9275E44Ea80eF17579d33c55136b7DA269aEb",
    value: "0xe0C9275E44Ea80eF17579d33c55136b7DA269aEb",
  },
  {
    key: "3",
    text: "WETH : 0xd0a1e359811322d97991e03f863a0c30c2cf029c",
    value: "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
  },
];

export interface tObj {
  address: string;
  returnValues: {
    vaultToken: string;
  };
}

export default function DeployNewVaultToken(props: {
  openPlusModal: boolean;
  onClose: any;
  acctNum: string;
}) {
  let managerAddr: string = JSON.parse(localStorage.getItem("account") || "{}");

  const [tokenName, setTokenName] = useState<string>("");
  const [tokenSymble, setTokenSymble] = useState<string>("");
  const [assetTokenAddr, setAssetTokenAddr] = useState<string>("");
  const [maxAmt, setMaxAmt] = useState<string>("10");
  const [showErrorMessage, setSowErrorMessage] = useState<boolean>(false);

  let factory = new Factory(web3);

  function handleClick(e: any) {
    e.preventDefault();
    if (tokenName === "" || tokenSymble === "" || assetTokenAddr === "") {
      setSowErrorMessage(true);
      setTimeout(() => {
        setSowErrorMessage(false);
      }, 3000);

      return;
    }
    let amount = web3.utils.toWei(maxAmt, "ether");
    console.log(amount);
    factory.deployNewVT(
      tokenName,
      tokenSymble,
      controllerAddr,
      assetTokenAddr,
      amount,
      props.acctNum
    );
  }

  function errorMessage() {
    return (
      <Message
        header="Error"
        content="Please make sure to enter all fields"
        negative
        size="small"
      />
    );
  }

  return (
    <div>
      <Modal
        open={props.openPlusModal}
        onClose={props.onClose}
        closeIcon
        size="small"
      >
        <Modal.Content>
          <Form>
            <Form.Field
              control={Input}
              label="Token Name"
              placeholder="Token Name"
              value={tokenName}
              onChange={(e: any) => setTokenName(e.target.value)}
              required
            />

            <Form.Field
              control={Input}
              label="Token Symbol"
              placeholder="Token Symbbol"
              value={tokenSymble}
              onChange={(e: any) => setTokenSymble(e.target.value)}
              required
            />
            <Form.Field
              control={Input}
              label="Maximum Amount (Ether)"
              placeholder="1"
              value={maxAmt}
              onChange={(e: any) => setMaxAmt(e.target.value)}
              required
            />
            <Form.Field
              control={Input}
              label="Manager Address"
              placeholder="Manager Address"
              value={managerAddr}
              // onChange={(e: any) => setManagerAddr(e.target.value)}
              required
            />
            <Form.Field>
              <Header size="small">Asset Token Address</Header>
              <Dropdown
                onChange={(e: React.SyntheticEvent<HTMLElement>, data: any) =>
                  setAssetTokenAddr(data.value)
                }
                allowAdditions
                options={assetTokenAddrs}
                placeholder="Asset Token Address"
                selection
                value={assetTokenAddr}
                widths="2"
                required
              />
            </Form.Field>
            {showErrorMessage && errorMessage()}
            <Form.Field
              control={Button}
              onClick={handleClick}
              icon="plus circle"
              content="Generate Token"
              labelPosition="right"
              color="teal"
              required
            />
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  );
}
