import React, { useState } from "react";
import { Icon, Menu, Button, Image, Divider } from "semantic-ui-react";
import MMConnect from "./MMconnection";
import DeployNewVaultToken from "./DeployNewVaultToken";
import profileImg from "../images/cover.png";

export default function TopMenu(props) {
  const [openPlusModal, setOpenPlusModal] = useState(false);

  // functions to open the deploy new token modal
  function openModal() {
    console.log("clikced");
    setOpenPlusModal(true);
  }

  return (
    <div
      style={{
        backgroundColor: "#e8dcef",
      }}
    >
      <Menu inverted circular secondary>
        <DeployNewVaultToken
          openPlusModal={openPlusModal}
          onClose={() => setOpenPlusModal(false)}
          acctNum={props.acctNum}
        />
        <Menu.Item>
          <img
            src={profileImg}
            style={{
              objectFit: "cover",
              marginTop: "10px",
              marginLeft: "20px",
            }}
          />
        </Menu.Item>
        <Menu.Menu position="right">
          {/* <Menu.Item> */}
          <Button
            icon="plus circle"
            size="large"
            color="teal"
            onClick={openModal}
            disabled={!props.acctNum}
          >
            New Token
          </Button>
          {/* </Menu.Item> */}
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
