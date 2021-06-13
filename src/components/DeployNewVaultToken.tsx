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
// import ErrorMessage from "./ErrorMessage";
// import SuccessMessage from "./SuccessMessage";
import StatusMessage from "./StatusMessage";

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
  // const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  // const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [showStatus, setShowStatus] = useState<boolean>(false);
  const [statusHeader, setStatusHeader] = useState<string>("");
  const [statusError, setStatusError] = useState<boolean>(false);
  const [txSent, setTxSent] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string>("");

  let factory = new Factory(web3);

  function setSM(h: any, m: any, s: any, e: any) {
    setStatusHeader(h);
    setStatusMessage(m);
    setShowStatus(s);
    setStatusError(e);
  }

  function handleClick(e: any) {
    e.preventDefault();
    if (tokenName === "" || tokenSymble === "" || assetTokenAddr === "") {
      setSM("Error", "Form input Error", true, true);

      setTimeout(() => {
        setSM("", "", false, false);
      }, 3000);

      return;
    }
    let amount = web3.utils.toWei(maxAmt, "ether");
    console.log(amount);

    setSM("MetaMask", "Sending Transaction", true, false);
    setTxSent(true);
    factory
      .deployNewVT(
        tokenName,
        tokenSymble,
        // controllerAddr,
        "0x0000000000000000000000000000000000000000",
        assetTokenAddr,
        amount,
        props.acctNum
      )
      .on("receipt", function (receipt: any) {
        console.log(receipt);
        setSM("TX Receipt Received", receipt, true, false);
      })
      .on("transactionHash", function (hash: any) {
        setTxHash(hash);
        setSM("TX Hash Received", hash, true, false);
      })
      .on("error", function (error: any, receipt: any) {
        let i = error.message.indexOf(":");
        let m = error.message.substring(0, i > 0 ? i : 40);
        setSM("TX Error", m, true, true);
      })
      .on("confirmation", function (confirmationNumber: any, receipt: any) {
        setSM(
          "Deploy TX Confirmed",
          confirmationNumber + " Confirmation Received",
          true,
          false
        );
      });
    // setShowSuccessMessage(true);
    setTimeout(() => {
      // setShowSuccessMessage(false);
      setTxSent(false);
      setTxHash("");
      // resetSM();
    }, 3000);
  }

  function resetSM() {
    setSM("", "", false, false);
  }
  function closeNewTokenModal() {
    setTxSent(false);
    setTxHash("");
    resetSM();
    //reset the fields
    props.onClose();
  }

  return (
    <div>
      <Modal
        open={props.openPlusModal}
        onClose={closeNewTokenModal}
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
              label="Controller Address"
              placeholder="Controller Address"
              value={controllerAddr}
              // onChange={(e: any) => setManagerAddr(e.target.value)}
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
              />
            </Form.Field>
            {/* {showErrorMessage && <ErrorMessage />} */}

            {showStatus && (
              <StatusMessage
                statusHeader={statusHeader}
                statusMessage={statusMessage}
                statusError={statusError}
                txHash={txHash}
              />
            )}
            {/* {showSuccessMessage && <SuccessMessage />} */}
            <Form.Field
              control={Button}
              onClick={handleClick}
              icon="plus circle"
              content="Generate Token"
              labelPosition="right"
              color="teal"
              required
              disabled={txSent}
            />
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  );
}
