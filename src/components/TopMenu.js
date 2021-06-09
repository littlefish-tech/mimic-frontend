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
        acctNum={props.acctNum}
      />
      <Menu inverted size="tiny" color="black">
        <Menu.Menu position="right">
          <Menu.Item>
            <Button
              icon="plus circle"
              size="medium"
              color="teal"
              onClick={openModal}
              disabled={!props.acctNum}
            >
              New Token
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button color="grey">
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
