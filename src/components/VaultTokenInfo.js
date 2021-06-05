import React from "react";
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
} from "semantic-ui-react";
import ERCTokenInfo from "./ERCTokenInfo";

export default function VaultTokenInfo(props) {
  console.log("props.token.assetObject");
  console.log(props.token.assetObject);

  function deposit(amount, to) {
    props.token.deposit(50000000000, props.acct);
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
            <Button
              onClick={deposit}
              color="blue"
              icon
              size="large"
              labelPosition="right"
            >
              Withdraw
              <Icon name="minus" />
            </Button>
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
            <Button
              onClick={deposit}
              color="orange"
              icon
              size="large"
              labelPosition="right"
            >
              Deposit
              <Icon name="plus" />
            </Button>
            {/* <Header>Total Supply: {props.token.assetObject.totalSupply}</Header> */}
          </Grid.Column>
          {/* <Header>{props.token.symbol()}</Header> */}
        </Grid>
        <Divider vertical>
          <Icon name="sync" size="huge" color="teal" />
        </Divider>
      </Segment>
      <Grid textAlign="center" stackable>
        <Grid.Column>
          <Header size="large" color="blue">
            Ratio: {props.token.totalSupply / props.token.assetObject.myBalance}
          </Header>
          <Header.Subheader># vault tokens/ vault assets</Header.Subheader>
        </Grid.Column>
      </Grid>

      {/* <Header>{props.token.symbol()}</Header> */}
    </div>
  );
}
