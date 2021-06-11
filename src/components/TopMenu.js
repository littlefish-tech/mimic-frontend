import React, { useState } from "react";
import {
  Icon,
  Menu,
  Button,
  Image,
  Divider,
  Header,
  Segment,
} from "semantic-ui-react";
import MMConnect from "./MMconnection";
import DeployNewVaultToken from "./DeployNewVaultToken";
import profileImg from "../images/cover.png";

export default function TopMenu(props) {
  // const [menuActive, setMenuActive] = useState(false);
  // const [homeNav, setHomeNav] = useState("black");
  // const [manageNav, setManagerNav] = useState("black");
  // const [tokenNav, setTokenNav] = useState("black");

  // function clickMenu(e, { name }) {
  //   e.preventDefault();
  //   setMenuActive(name);
  //   if (name === "manager") {
  //     setManagerNav("purple");
  //     setTokenNav("black");
  //     setHomeNav("black");
  //   } else if (name === "token") {
  //     setManagerNav("black");
  //     setTokenNav("purple");
  //     setHomeNav("black");
  //   } else if (name === "home") {
  //     setManagerNav("black");
  //     setTokenNav("black");
  //     setHomeNav("purple");
  //   }
  // }
  // function clickManagerNav(e) {
  //   e.preventDefault();
  //   setManagerNav("purple");
  //   setTokenNav("black");
  // }
  // function clickTokenNav(e) {
  //   e.preventDefault();
  //   setManagerNav("black");
  //   setTokenNav("purple");
  // }

  // functions to open the deploy new token modal
  // function openModal() {
  //   console.log("clikced");
  //   setOpenPlusModal(true);
  // }

  return (
    <div
      style={{
        backgroundColor: "#e8dcef",
      }}
    >
      <div style={{ paddingTop: "15px" }}>
        <Menu inverted secondary>
          {/* <DeployNewVaultToken
            openPlusModal={openPlusModal}
            onClose={() => setOpenPlusModal(false)}
            acctNum={props.acctNum}
          /> */}
          <Menu.Item>
            <img
              src={profileImg}
              style={{
                objectFit: "cover",

                // marginLeft: "20px",
              }}
            />
          </Menu.Item>
          <Menu.Item
            name="home"
            position="right"
            // active={menuActive === "home"}
            active={props.renderHome}
            // onClick={clickMenu}
            onClick={props.clickHome}
          >
            <Header size="large" color={props.homeNav}>
              Home
            </Header>
          </Menu.Item>
          <Menu.Item
            name="trade"
            position="right"
            // active={menuActive === "trade"}
            active={props.renderFollow}
            // onClick={clickMenu}
            onClick={props.clickTrade}
          >
            <Header size="large" color={props.tradeNav}>
              Trade
            </Header>
          </Menu.Item>
          <Menu.Item
            name="manager"
            position="right"
            // active={menuActive === "manager"}
            active={props.renderManager}
            onClick={props.clickManager}
          >
            <Header size="large" color={props.managerNav}>
              Manager
            </Header>
          </Menu.Item>

          <Menu.Menu position="right">
            {/* <Menu.Item>
              <Button
                icon="plus circle"
                size="large"
                color="teal"
                onClick={openModal}
                disabled={!props.acctNum}
              >
                New Token
              </Button>
            </Menu.Item> */}
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
    </div>
  );
}
