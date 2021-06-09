import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import Web3 from "web3";
import VTList from "./components/VTList.js";
import { Button, Header, Modal } from "semantic-ui-react";
import DeployNewVaultToken from "./components/DeployNewVaultToken";
import TopMenu from "./components/TopMenu";
import { AddressBook } from "./components/AddressBook";

// create a new web3 oject
// let web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
let web3 = new Web3(Web3.givenProvider);

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function App() {
  // check localstorage if the wallet address is saves
  // if wallet address is saved
  // display the address
  let addr: string = JSON.parse(localStorage.getItem("account") || "false");
  // if (addr) {
  //   const fFive = addr.slice(0, 10);
  //   const lFive = addr.slice(-8);
  //   addr = `${fFive}...${lFive}`;
  // }

  const [hasMM, setHasMM] = useState<boolean>(false);
  const [btnText, setBtnText] = useState<string>("Connect MetaMask");
  const [acctNum, setAcctNum] = useState<string>(addr);
  const [chainId, setChainId] = useState<number | undefined>();
  const [ethBal, setEthBal] = useState<number | undefined>();
  const [mpAddress, setMPAddress] = useState<string>("");

  // check if the meta mask is installed when the page load
  useEffect(() => {
    console.log("acctNum");
    console.log(typeof acctNum);
    console.log(acctNum);
    if (acctNum && acctNum !== "undefined") {
      const fFive = addr.slice(0, 10);
      const lFive = addr.slice(-8);
      let t = `${fFive}...${lFive}`;

      setBtnText(t);
      getMarginPoolAddress();
    }

    hasMMInstall();
  }, []);

  function getMarginPoolAddress() {
    let ab = new AddressBook(web3);
    ab.getMarginPool().then((result) => {
      setMPAddress(result);
    });
  }

  // check if meta mask is installed
  async function hasMMInstall() {
    if (typeof window.ethereum !== "undefined") {
      await setHasMM(true);

      return;
    }
  }
  async function connectMM(e: any) {
    if (!hasMM) {
      alert("You must install MetaMask first");
    } else {
      // const accounts = await web3.eth.getAccounts();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      const account: string = accounts[0];
      const fFive = account.slice(0, 10);
      const lFive = account.slice(-8);
      const wAddress = `${fFive}...${lFive}`;
      setAcctNum(account);
      setBtnText(wAddress);
      const chain_Id = await web3.eth.getChainId();
      const weiBal = await web3.eth.getBalance(account);
      const ethBal = parseInt(weiBal) / 1000000000000000000;
      setChainId(chain_Id);
      setEthBal(ethBal);
      localStorage.setItem("account", JSON.stringify(account));
    }
  }

  return (
    <div>
      <TopMenu
        btnText={btnText}
        acctNum={acctNum}
        chainId={chainId}
        ethBal={ethBal}
        connectMM={connectMM}
      />
      {addr ? (
        <VTList acctNum={acctNum} mpAddress={mpAddress} />
      ) : (
        <div>Please connect to mask first</div>
      )}

      <div className="content"></div>
    </div>
  );
}
