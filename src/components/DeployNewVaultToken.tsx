import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { Button, Dropdown, Form, Input, Modal } from "semantic-ui-react";
import { Factory } from "./Factory";

// import Factory from "../lib/Factory";

// const assetTokenAddr = require("../assetTokenAddr.json");

let web3 = new Web3(
  Web3.givenProvider || "ws://some.local-or-remote.node:8546"
);

const controllerAddr = "0xdee7d0f8ccc0f7ac7e45af454e5e7ec1552e8e4e";

//factory contract address
const factoryContractAddr = "0xE777AD5675A98C20A6d1E14Df8AA81543623Ea29";

// import the factory contract abi
const factoryAbi = require("../abi/factoryabi.json");
const vtAbi = require("../abi/vtAbi.json");

const uniswapAddr: string = "0x20afC36823E038F37f55976a65330f452B2f2637";

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
  const [tokenObjArr, setTokenObjArr] = useState<Object[]>([]);
  //   const [managerAddr, setManagerAddr] = useState<string>("");

  let factory = new Factory(web3);

  function handleClick(e: any) {
    e.preventDefault();

    factory.deployNewVT(
      tokenName,
      tokenSymble,
      controllerAddr,
      assetTokenAddr,
      props.acctNum
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
            />

            <Form.Field
              control={Input}
              label="Token Symbol"
              placeholder="Token Symbbol"
              value={tokenSymble}
              onChange={(e: any) => setTokenSymble(e.target.value)}
            />

            <Form.Field
              control={Input}
              label="Manager Address"
              placeholder="Manager Address"
              value={managerAddr}
              // onChange={(e: any) => setManagerAddr(e.target.value)}
            />
            <Form.Field>
              <Dropdown
                onChange={(e: React.SyntheticEvent<HTMLElement>, data: any) =>
                  setAssetTokenAddr(data.value)
                }
                options={assetTokenAddrs}
                placeholder="Choose an option"
                selection
                value={assetTokenAddr}
                widths="2"
              />
            </Form.Field>
            <Form.Field
              control={Button}
              onClick={handleClick}
              icon="plus circle"
              content="Generate Token"
              labelPosition="right"
              color="teal"
            ></Form.Field>
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  );
}
