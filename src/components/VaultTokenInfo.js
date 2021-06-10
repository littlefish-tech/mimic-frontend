import React, { useState } from "react";

import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import {
  Item,
  Modal,
  Header,
  Button,
  Grid,
  Divider,
  Label,
  Icon,
  Segment,
  Form,
  Dropdown,
  Menu,
  Message,
} from "semantic-ui-react";
import Web3 from "web3";
import ERCTokenInfo from "./ERCTokenInfo";
// let web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
let web3 = new Web3(Web3.givenProvider);

const units = [
  { key: 1, text: "Wei", value: "wei" },
  { key: 2, text: "Token", value: "ether" },
];

export default function VaultTokenInfo(props) {
  const [depositAmt, setDeposit] = useState(0);
  const [withdrawAmt, setWithdrawAmt] = useState(0);
  const [initializeAmt, setInitializeAmt] = useState(0);
  const [dUnit, setDUnit] = useState("wei");
  const [wUnit, setWUnit] = useState("wei");
  const [iUnit, setIUnit] = useState("wei");
  const [writeCallUnit, setWiteCallIUnit] = useState("wei");
  const [sellCallUnit, setSellCallIUnit] = useState("wei");
  const [pemiumUnit, setPemiumUnit] = useState("wei");

  const [oTokenAddress, setOTokenaddress] = useState("");
  const [writeCallAmt, setWriteCallAmt] = useState(0);
  const [sellCallAmt, setSellCallAmt] = useState(0);
  const [premiumAmount, setPemiumAmount] = useState(0);
  const [otherPartyAddress, setOtherPartyAddress] = useState(0);
  const [showWriteCall, setShowWriteCall] = useState(false);
  const [showSellCall, setShowSellCall] = useState(false);
  const [writeColor, setWriteColor] = useState("teal");
  const [sellColor, setSellColor] = useState("teal");
  const [settleColor, setSettleColor] = useState("teal");

  const [showWithdrawErrormsg, setShowWithdrawErrormsg] = useState(false);
  const [showDepositErrormsg, setShowDepositErrormsg] = useState(false);
  const [showIniErrormsg, setShowIniErrormsg] = useState(false);
  const [showWithdrawSuccessmsg, setShowWithdrawSuccessmsg] = useState(false);
  const [showDepositSuccessmsg, setShowDepositSuccessmsg] = useState(false);
  const [showIniSuccessmsg, setShowIniSuccessmsg] = useState(false);

  const [showWriteErrMsg, setShowWriteErrMsg] = useState(false);
  const [showWriteSuccMsg, setShowWriteSuccMsg] = useState(false);

  const [showSellErrMsg, setShowSellErrMsg] = useState(false);
  const [showSellSuccMsg, setShowSellSuccMsg] = useState(false);

  function deposit(amt) {
    if (amt === 0) {
      setShowDepositErrormsg(true);
      setTimeout(() => {
        setShowDepositErrormsg(false);
      }, 3000);

      return;
    }
    let amount = web3.utils.toWei(amt, dUnit);
    props.token.deposit(amount, props.acct);
    setShowDepositSuccessmsg(true);
    setTimeout(() => {
      setShowDepositSuccessmsg(false);
      setDeposit(0);
    }, 3000);
  }

  function initialize(amt) {
    if (amt === 0) {
      setShowIniErrormsg(true);
      setTimeout(() => {
        setShowIniErrormsg(false);
      }, 3000);

      return;
    }
    let amount = web3.utils.toWei(amt, iUnit);
    props.token.initialize(amount, props.acct);
    setShowIniSuccessmsg(true);
    setTimeout(() => {
      setShowIniSuccessmsg(false);
      setInitializeAmt(0);
    }, 3000);
  }

  function withDraw(amt) {
    if (amt === 0) {
      setShowWithdrawErrormsg(true);
      setTimeout(() => {
        setShowWithdrawErrormsg(false);
      }, 3000);

      return;
    }
    let amount = web3.utils.toWei(amt, wUnit);
    props.token.withdraw(amount, props.acct);

    setShowWithdrawSuccessmsg(true);
    setTimeout(() => {
      setShowWithdrawSuccessmsg(false);
      setWithdrawAmt(0);
    }, 3000);
  }

  function updatedUnit(e, { value }) {
    setDUnit(value);
  }
  function updatewUnit(e, { value }) {
    setWUnit(value);
  }

  function updateIUnit(e, { value }) {
    setIUnit(value);
  }

  function updatePremiumUnit(e, { value }) {
    setPemiumUnit(value);
  }

  function updateWriteCallUnit(e, { value }) {
    setWiteCallIUnit(value);
  }
  function updateSellCallUnit(e, { value }) {
    setSellCallIUnit(value);
  }

  function settleVault() {
    props.token.settleVault(props.acct);
  }

  function writeCall(amt, oTAddress) {
    let amount = web3.utils.toWei(amt, writeCallUnit);

    props.token.writeCalls(amount, oTAddress, props.mpAddress, props.acct);
  }

  function sellCall(amt, premiumAmount, otherPartyAddress) {
    let amount = web3.utils.toWei(amt, sellCallUnit);
    console.log(amount);
    let pAmount = web3.utils.toWei(premiumAmount, pemiumUnit);
    props.token.sellCalls(amount, pAmount, otherPartyAddress, props.acct);
  }

  function confirmWriteCall(e) {
    e.preventDefault();
    if (writeCallAmt === 0 || oTokenAddress === "") {
      setShowWriteErrMsg(true);
      setTimeout(() => {
        setShowWriteErrMsg(false);
      }, 3000);

      return;
    }
    writeCall(writeCallAmt, oTokenAddress);
    setShowWriteSuccMsg(true);
    setTimeout(() => {
      setShowWriteSuccMsg(false);
      setWriteCallAmt(0);
      setOTokenaddress("");
    }, 3000);
  }

  function confirmSellCall(e) {
    e.preventDefault();
    if (sellCallAmt === 0 || premiumAmount === 0 || otherPartyAddress === "") {
      setShowSellErrMsg(true);
      setTimeout(() => {
        setShowSellErrMsg(false);
      }, 3000);

      return;
    }
    console.log(sellCallAmt, premiumAmount, otherPartyAddress);
    sellCall(sellCallAmt, premiumAmount, otherPartyAddress);
    console.log(sellCallAmt, premiumAmount, otherPartyAddress);
    setShowSellSuccMsg(true);
    setTimeout(() => {
      setShowSellSuccMsg(false);
      setSellCallAmt(0);
      setPemiumAmount(0);
      setOtherPartyAddress("");
    }, 3000);
  }

  function writeCallRender() {
    return (
      <Form>
        <Divider hidden />
        <Form.Group>
          <Form.Field>
            <input
              value={writeCallAmt}
              onChange={(e) => setWriteCallAmt(e.target.value)}
            />
          </Form.Field>

          <Menu compact size="tiny">
            <Dropdown
              defaultValue="wei"
              options={units}
              item
              onChange={updateWriteCallUnit}
            />
          </Menu>
        </Form.Group>
        <Form.Field>
          <input
            value={oTokenAddress}
            onChange={(e) => setOTokenaddress(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <input placeholder={props.mpAddress} value={props.mpAddress} />
        </Form.Field>
        {showWriteErrMsg && <ErrorMessage />}
        {showWriteSuccMsg && <SuccessMessage />}
        <Button
          color="teal"
          onClick={confirmWriteCall}
          // {() => {
          //   writeCall(writeCallAmt, oTokenAddress);
          //   setShowWriteCall(false);
          // }}
        >
          Confirm
        </Button>
        <Button
          onClick={() => {
            setShowWriteCall(false);
            setSellColor("teal");
            setSettleColor("teal");
          }}
        >
          Cancel
        </Button>
      </Form>
    );
  }
  function showTokenPair() {
    return (
      <Segment basic>
        <Grid stackable columns={2}>
          <Grid.Column>
            <Header color="grey" size="medium">
              vault{" "}
            </Header>
            <Header size="huge" color="blue">
              {props.token.name()}
            </Header>

            <Header size="medium">
              My Balance: {props.token.myBalance / 1e18}
            </Header>

            {/* <Header>{props.token.symbol()}</Header> */}

            <Header size="medium">
              Total Supply: {props.token.totalSupply / 1e18}
            </Header>
            <Divider hidden />
            {props.token.totalSupply > 0 && (
              <Form>
                <Form.Group>
                  <Form.Field>
                    <input
                      value={withdrawAmt}
                      onChange={(e) => setWithdrawAmt(e.target.value)}
                    />
                  </Form.Field>
                  <Menu compact size="tiny">
                    <Dropdown
                      defaultValue="wei"
                      options={units}
                      item
                      onChange={updatewUnit}
                    />
                  </Menu>
                </Form.Group>
                {showWithdrawErrormsg && <ErrorMessage />}
                {showWithdrawSuccessmsg && <SuccessMessage />}
                <Button
                  onClick={() => withDraw(withdrawAmt)}
                  color="blue"
                  icon
                  size="large"
                  labelPosition="right"
                  disabled={props.token.myBalance === 0}
                >
                  Withdraw
                  <Icon name="arrow right" />
                </Button>
              </Form>
            )}
          </Grid.Column>

          <Grid.Column textAlign="right">
            <Header color="grey" size="medium">
              asset{" "}
            </Header>
            <Header size="huge" color="orange">
              {props.token.assetObject.name()}
            </Header>

            <Header size="medium">
              My Balance: {props.token.assetObject.myBalance / 1e18}
            </Header>

            <Header size="medium">
              Vault Balance: {props.token.vaultBalance / 1e18}
            </Header>
            <Divider hidden />
            {props.token.totalSupply > 0 && (
              <Form>
                <Form.Group>
                  <Form.Field>
                    <input
                      value={depositAmt}
                      onChange={(e) => setDeposit(e.target.value)}
                    />
                  </Form.Field>
                  <Menu compact size="tiny">
                    <Dropdown
                      defaultValue="wei"
                      options={units}
                      item
                      onChange={updatedUnit}
                    />
                  </Menu>
                </Form.Group>
                {showDepositErrormsg && <ErrorMessage />}
                {showDepositSuccessmsg && <SuccessMessage />}
                <Button
                  onClick={() => deposit(depositAmt)}
                  color="orange"
                  icon
                  size="large"
                  labelPosition="left"
                  disabled={
                    props.token.totalSupply === 0 ||
                    props.token.assetObject.myBalance === 0
                  }
                >
                  Deposit
                  <Icon name="arrow left" />
                </Button>
              </Form>
            )}
            {/* <Header>Total Supply: {props.token.assetObject.totalSupply}</Header> */}
          </Grid.Column>
          {/* <Header>{props.token.symbol()}</Header> */}
        </Grid>
        <Divider vertical>
          <Icon name="sync" size="huge" color="teal" />
        </Divider>
      </Segment>
    );
  }

  function showRatio() {
    return (
      <Grid textAlign="center" stackable>
        <Grid.Column>
          <Header size="large" color="blue">
            Ratio: {props.token.totalSupply / props.token.vaultBalance}
          </Header>
          <Header.Subheader># vault tokens/ vault assets</Header.Subheader>
        </Grid.Column>
      </Grid>
    );
  }

  function showInitialize() {
    return (
      <div>
        <Divider />
        <Divider hidden />
        <Grid textAlign="center">
          <Form>
            <Form.Group>
              <Form.Field>
                <input
                  value={initializeAmt}
                  onChange={(e) => setInitializeAmt(e.target.value)}
                />
              </Form.Field>
              <Menu compact size="tiny">
                <Dropdown
                  defaultValue="wei"
                  options={units}
                  item
                  onChange={updateIUnit}
                />
              </Menu>

              <Button onClick={() => initialize(initializeAmt)} color="teal">
                Initialize
              </Button>
            </Form.Group>
            {showIniErrormsg && <ErrorMessage />}
            {showIniSuccessmsg && <SuccessMessage />}
          </Form>
        </Grid>
      </div>
    );
  }

  function renderSellCall() {
    return (
      <Form>
        <Divider hidden />
        <Form.Group>
          <Form.Field>
            <label>Amount</label>
            <input
              placeholder="amount"
              onChange={(e) => setSellCallAmt(e.target.value)}
            />
          </Form.Field>

          <Form.Field>
            <label>select</label>
            <Menu compact size="tiny">
              <Dropdown
                defaultValue="wei"
                options={units}
                item
                onChange={updateSellCallUnit}
              />
            </Menu>
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <label>Premium Amount</label>
            <input
              placeholder="amount"
              onChange={(e) => setPemiumAmount(e.target.value)}
            />
          </Form.Field>

          <Form.Field>
            <label>select</label>
            <Menu compact size="tiny">
              <Dropdown
                defaultValue="wei"
                options={units}
                item
                onChange={updatePremiumUnit}
              />
            </Menu>
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label>Other party address</label>
          <input
            placeholder="Other party address"
            onChange={(e) => setOtherPartyAddress(e.target.value)}
          />
        </Form.Field>
        {showSellErrMsg && <ErrorMessage />}
        {showSellSuccMsg && <SuccessMessage />}
        <Button
          color="teal"
          onClick={confirmSellCall}
          //   () => {
          //   sellCall(sellCallAmt, premiumAmount, otherPartyAddress);
          //   setShowSellCall(false);
          // }}
        >
          Confirm
        </Button>
        <Button
          onClick={() => {
            setShowSellCall(false);
            setWriteColor("teal");
            setSettleColor("teal");
          }}
        >
          Cancel
        </Button>
      </Form>
    );
  }

  function managerMenu() {
    return (
      <div>
        <Divider />
        <Divider hidden />
        <Divider hidden />
        <Grid centered>
          <Header>Manage</Header>
        </Grid>
        <Grid centered columns={3} textAlign="center" relaxed>
          <Grid.Row>
            <Grid.Column stretched>
              <Button
                labelPosition="right"
                icon
                color={writeColor}
                onClick={() => {
                  setShowWriteCall(true);
                  setWriteColor("teal");
                  setShowSellCall(false);
                  setSellColor("grey");
                  setSettleColor("grey");
                }}
              >
                Write Call
                <Icon name="triangle down" />
              </Button>
            </Grid.Column>
            <Grid.Column stretched>
              <Button
                color={sellColor}
                labelPosition="right"
                icon
                onClick={() => {
                  // sellCall(sellCallAmt, premiumAmount, otherPartyAddress);
                  setShowSellCall(true);
                  setShowWriteCall(false);
                  setSellColor("teal");
                  setWriteColor("grey");
                  setSettleColor("grey");
                }}
              >
                Sell Call
                <Icon name="triangle down" />
              </Button>
            </Grid.Column>
            <Grid.Column stretched>
              <Button
                color={settleColor}
                onClick={settleVault}
                disabled={props.token.expireTime > Date.now()}
                // disabled={props.token.expireTime > Date.now()}
                disabled
              >
                Settle Vault
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {showWriteCall && writeCallRender()}
        {showSellCall && renderSellCall()}
      </div>
    );
  }

  return (
    <div>
      {/* <Header>Asset Token: {props.token.asset}</Header>
      <Header>Manager: {props.token.manager}</Header> */}
      {/* {props.token.assetObject && (
        <ERCTokenInfo token={props.token.assetObject} />
      )} */}
      {showTokenPair()}
      {props.token.vaultBalance > 0 && showRatio()}
      {props.token.totalSupply === 0 && showInitialize()}

      {props.token.manageToken && managerMenu()}

      {/* <Header>{props.token.symbol()}</Header> */}
    </div>
  );
}
