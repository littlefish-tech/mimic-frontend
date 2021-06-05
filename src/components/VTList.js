import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { Factory } from "./Factory";
import { VaultToken } from "./VaultToken";
import TokenList from "./TokenList";
import VaultContract from "./VaultContract";

import { Table } from "semantic-ui-react";
import { ERC20 } from "./Erc20";

const factoryContractAddr = "0xE777AD5675A98C20A6d1E14Df8AA81543623Ea29";

export default function VTList(props) {
  const [vtList, setVTList] = useState([]);
  const [count, setCount] = useState(-1);
  const [update, setUpdate] = useState(0);
  const [managedList, setManagedList] = useState([]);
  const [portfolioList, setPortfolioList] = useState([]);
  const [followList, setFollowList] = useState([]);
  const [assetTokenList, setAssetTokenList] = useState([]);

  let web3 = new Web3(
    Web3.givenProvider || "ws://some.local-or-remote.node:8546"
  );

  function getAllVT() {
    console.log("ingetallvt");
    let factoryObj = new Factory(web3, factoryContractAddr);

    let p = factoryObj.findAllVT();
    let vTokenList = vtList;

    let foundNewToken = false;

    p.then((result) => {
      let events = result;
      for (let i = 0; i < events.length; i++) {
        let addr = events[i].returnValues.vaultToken;
        if (!include(addr, vTokenList)) {
          console.log("found a new token   " + addr);
          foundNewToken = true;
          let v = new VaultToken(web3, events[i].returnValues.vaultToken);
          vTokenList.push(v);
        }
      }
      if (foundNewToken) {
        setVTList(vTokenList);
      }
    });
    setTimeout(() => {
      getAllVT();
    }, 10000);
  }

  function getAllVTOld() {
    let factoryObj = new Factory(web3, factoryContractAddr);

    let p = factoryObj.findAllVT();
    let vTokenList = [];
    p.then((result) => {
      let events = result;
      for (let i = 0; i < events.length; i++) {
        let v = new VaultToken(web3, events[i].returnValues.vaultToken);

        vTokenList.push(v);
      }
      setVTList(vTokenList);
    });
  }

  function include(address, list) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].address === address) {
        return true;
      }
    }
    return false;
  }

  function populateManager(i) {
    let v = vtList[i];
    if (v.tName === "") {
      return;
    }
    if (v.manager === "") {
      v.getManager().then((result) => {
        v.setManager(result);
        // if the result === my addr
        // append the v to the managed list
        if (
          result === props.acctNum &&
          !include(result, managedList) &&
          v.tName !== "token"
        ) {
          managedList.push(v);
          setManagedList(managedList);
        }
      });
    }
  }

  function populateAsset(k) {
    let v = vtList[k];
    let found = false;
    if (v.asset === "") {
      let i = 0;
      v.getAsset().then((result) => {
        v.setAsset(result);
        for (i = 0; i < assetTokenList.length; i++) {
          if (assetTokenList[i].address === result) {
            found = true;
            // console.log("found object" + assetTokenList[i]);
            // let n = [...vtList];
            // n[k].assetObject = assetTokenList[i];
            // setVTList(n);
            vtList[k].assetObject = assetTokenList[i];
          }
        }
        if (!found) {
          let a = new ERC20(web3, result);
          // console.log("+++++++++" + v.tName);
          let p = assetTokenList;
          p.push(a);
          // vtList[i].assetObject = a;
          setAssetTokenList(p);
          // let n = [...vtList];
          // n[k].assetObject = a;
          // setVTList(n);
          vtList[k].assetObject = a;
        }
      });
    }
  }

  function populateName(i) {
    // v.getName().then((result) => {
    // });
    let v = vtList[i];
    if (v.tName === "") {
      let o = [];

      v.getName().then((result) => {
        v.setName(result);
        o = [...vtList];
        o[i] = v;
        setVTList(o);
      });
    }
  }

  function populateAssetName(i) {
    // v.getName().then((result) => {
    // });
    let v = assetTokenList[i];
    if (v.tName === "") {
      let o = [];

      v.getName().then((result) => {
        v.setName(result);
        o = [...assetTokenList];
        o[i] = v;
        setAssetTokenList(o);
      });
    }
  }

  // function populateBalance(i) {
  //   let v = vList[i];
  //   if (v.balance(props.acctNum) !== 0) {
  //     portfolioList.push(v);
  //     setPortfolioList(portfolioList);
  //   }
  // }

  function populate() {
    // if (vtList.length === 0) {
    setTimeout(() => {
      setUpdate(update + 1);
    }, 3000);
    // }
    console.log("populate" + vtList.length);
    for (let i = 0; i < vtList.length; i++) {
      // if (vtList[i].name() === "Name") {
      populateName(i, vtList, setVTList);
      populateManager(i);
      populateAsset(i);
      //getting my balance for all the tokens in the list
      vtList[i].getBalance(props.acctNum).then((result) => {
        vtList[i].setBalance(result);
        // if result is bigger than 0
        // put the vtList[i] to in portfolio list
        // if it is not already there

        if (
          result > 0 ||
          vtList[i].tName === "solar" ||
          vtList[i].tName === "flower"
        ) {
          if (!include(vtList[i].address, portfolioList)) {
            portfolioList.push(vtList[i]);
            setPortfolioList(portfolioList);
          }
        }
      });
      vtList[i].updateTotalSupply().then((result) => {
        vtList[i].setTotalSupply(result);
      });
      vtList[i].updateStatus();
    }

    for (let i = 0; i < assetTokenList.length; i++) {
      // if (vtList[i].name() === "Name") {
      populateAssetName(i);
      // getting my balance for all the asset tokens
      assetTokenList[i].getBalance(props.acctNum).then((result) => {
        assetTokenList[i].setBalance(result);
      });
      assetTokenList[i].updateTotalSupply().then((result) => {
        assetTokenList[i].setTotalSupply(result);
      });
      // console.log(assetTokenList);
      // populateManager(i);
      // populateAsset(i);
      // vtList[i].getBalance(props.acctNum).then((result) => {
      //   console.log(result);
      //   vtList[i].setBalance(result);
      // });
      // vtList[i].updateTotalSupply().then((result) => {
      //   vtList[i].setTotalSupply(result);
      // });
    }

    for (let i = 0; i < vtList.length; i++) {
      let v = vtList[i];
      if (
        !include(v.address, portfolioList) &&
        !include(v.address, managedList) &&
        !include(v.address, followList)
      ) {
        followList.push(v);
        setFollowList(followList);
      }
    }
    let nList = [];
    for (let i = 0; i < followList.length; i++) {
      let v = followList[i];
      if (
        !(include(v.address, portfolioList) || include(v.address, managedList))
      ) {
        nList.push(v);
        // setFollowList(followList);
      }
    }
    setFollowList(nList);
  }

  useEffect(() => {
    getAllVT();
    populate();
  }, []);
  useEffect(() => {
    populate();
  }, [update]);
  return (
    <div>
      <Table celled padded textAlign="center">
        <Table.Body>
          <Table.Row verticalAlign="top">
            {/* <Table.Cell>
              {" "}
              <TokenList tList={vtList} update={update} title="Token List" />
            </Table.Cell> */}
            <Table.Cell>
              <TokenList
                tList={managedList}
                update={update}
                title="Managed Token"
              />
            </Table.Cell>
            <Table.Cell>
              <TokenList
                tList={portfolioList}
                update={update}
                title="Portfolio"
              />
            </Table.Cell>
            <Table.Cell>
              <TokenList
                tList={followList}
                update={update}
                title="Follow List"
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
