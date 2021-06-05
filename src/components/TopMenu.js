import React, { useState } from "react";
import { Icon, Menu, Button } from "semantic-ui-react";
import MMConnect from "./MMconnection";
import DeployNewVaultToken from "./DeployNewVaultToken";

export default function TopMenu(props) {
  const [openPlusModal, setOpenPlusModal] = useState(false);
  // functions to open the deploy new token modal
  function openModal() {
    console.log("clikced");
    setOpenPlusModal(true);
  }

  return (
    <div>
      <DeployNewVaultToken
        openPlusModal={openPlusModal}
        onClose={() => setOpenPlusModal(false)}
      />
      <Menu inverted size="tiny" color="black">
        <Menu.Menu position="right">
          <Menu.Item>
            <Icon
              name="plus circle"
              size="large"
              color="teal"
              onClick={openModal}
            />
          </Menu.Item>
          <Menu.Item>
            <Button color="orange">
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
        </Menu.Menu>
      </Menu>
    </div>
  );
}
