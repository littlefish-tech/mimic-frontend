import React, { Component } from "react";
import { Icon, Input, Menu, Button } from "semantic-ui-react";
import MMConnect from "./components/MMconnection";

export default function TopMenu(props) {
  return (
    <div>
      <Menu inverted size="tiny" color="black">
        <Menu.Menu position="right">
          <Menu.Item>
            <Button>
              {" "}
              <MMConnect
                btnText={props.btnText}
                acctNum={props.acctNum}
                chainId={props.chainId}
                ethBal={props.ethBal}
                connectMM={props.connectMM}
              />
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button>Click Here</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
}
