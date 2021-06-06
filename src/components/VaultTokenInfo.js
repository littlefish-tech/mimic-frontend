import React, { useState } from "react";
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
} from "semantic-ui-react";
import Web3 from "web3";
import ERCTokenInfo from "./ERCTokenInfo";
let web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const units = [
  { key: 1, text: "Wei", value: "wei" },
  { key: 2, text: "Token", value: "ether" },
];

export default function VaultTokenInfo(props) {
  const [depositAmt, setDeposit] = useState(0);
  const [initializeAmt, setInitializeAmt] = useState(0);
  const [dUnit, setDUnit] = useState("wei");
  const [wUnit, setWUnit] = useState("wei");
  const [iUnit, setIUnit] = useState("wei");

  function deposit(amt) {
    let amount = web3.utils.toWei(amt, dUnit);
    props.token.deposit(amount, props.acct);
    setDeposit(0);
  }

  function initialize(amt) {
    let amount = web3.utils.toWei(amt, iUnit);
    props.token.initialize(amount, props.acct);
  }

  function updatedUnit(e, { value }) {
    setDUnit(value);
  }
  function updateIUnit(e, { value }) {
    setIUnit(value);
  }

  return (
    <div>
      {/* <Header>Asset Token: {props.token.asset}</Header>
      <Header>Manager: {props.token.manager}</Header> */}
      {/* {props.token.assetObject && (
        <ERCTokenInfo token={props.token.assetObject} />
      )} */}
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
                      placeholder="Deposit"
                      onChange={(e) => setDeposit(e.target.value)}
                    />
                  </Form.Field>
                  <Menu compact>
                    <Dropdown
                      defaultValue="wei"
                      options={units}
                      item
                      onChange={updatedUnit}
                    />
                  </Menu>
                </Form.Group>
                <Button
                  onClick={deposit}
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
                      placeholder="Deposit (wei)"
                      onChange={(e) => setDeposit(e.target.value)}
                    />
                  </Form.Field>
                  <Menu compact>
                    <Dropdown
                      defaultValue="wei"
                      options={units}
                      item
                      onChange={updatedUnit}
                    />
                  </Menu>
                </Form.Group>

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
      {props.token.vaultBalance > 0 && (
        <Grid textAlign="center" stackable>
          <Grid.Column>
            <Header size="large" color="blue">
              Ratio: {props.token.totalSupply / props.token.vaultBalance}
            </Header>
            <Header.Subheader># vault tokens/ vault assets</Header.Subheader>
          </Grid.Column>
        </Grid>
      )}
      {props.token.totalSupply === 0 && (
        <div>
          <Divider />
          <Divider hidden />
          <Grid textAlign="center">
            <Form>
              <Form.Group>
                <Form.Field>
                  <input
                    placeholder="Initilize"
                    onChange={(e) => setInitializeAmt(e.target.value)}
                  />
                </Form.Field>
                <Menu compact>
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
            </Form>
          </Grid>
        </div>
      )}

      {props.token.manageToken && (
        <div>
          <Divider />
          <Header>Manage</Header>
          <Grid>
            <Button>Write call</Button>
          </Grid>
        </div>
      )}

      {/* <Header>{props.token.symbol()}</Header> */}
    </div>
  );
}
