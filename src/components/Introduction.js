import React from "react";
import { Icon, Card } from "semantic-ui-react";

import profileImg from "../images/profile.png";

import "../App.css";

export default function Introduction() {
  const optionalImg = {
    width: "600px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const cardStyle = {
    width: "40%",
    textAlign: "center",
    lineHeight: "1.2,",
    fontSize: "28px",
    borderRadius: "30px",
    marginTop: "50px",
    boxShadow:
      "0 20px 40px 0 rgba(0, 0, 0, 0.2), 0 16px 40px 0 rgba(0, 0, 0, 0.19)",
    transition: "transform 0.5s",
    backgroundColor: "#8980EA",
    color: "white",
  };
  const socialStyle = {
    textDecoration: "none",
    color: "black",
    fontSize: "44px",
    fontWeight: "bold",
    transition: "transform 0.5s",
    cursor: "pointer",
  };
  const aboutTextStyle = {
    lineHeight: "2.5",
    paddingBottom: "20px",
    paddingLeft: "15px",
    paddingRight: "15px",
  };
  const cardHeaderStyling = {
    paddingTop: "45px",
    fontWeight: "bold",
    backgroundColor: "#4F70F6",
    paddingBottom: "40px",
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "30px",
  };

  return (
    <div style={{ backgroundImage: " linear-gradient(#eddbf4, #89609e)" }}>
      <img src={profileImg} style={optionalImg} />

      <h2
        style={{
          textAlign: "center",
        }}
      >
        Decentralized Social Trading for Options
      </h2>
      <h2
        style={{
          textAlign: "center",
        }}
      >
        You Deposit. They Trade. You Earn.
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <div className="aboutCard" style={cardStyle}>
          <h1 style={cardHeaderStyling}>About Optional</h1>
          <br />
          <p style={aboutTextStyle}>
            Optional is a social trading platform for options built atop of the
            Gamma Protocol by Opyn.
          </p>
          <p style={aboutTextStyle}>
            Optional enables people to deposit funds into specially managed
            vault-style tokens that allows the depositor to earn while the
            social trader makes the moves for you to potentially grow your
            assets.
          </p>
          <p style={aboutTextStyle}>
            Additionally, managers can use their following to enable followers
            frictionless access to their moves without the use of bots and or
            constant monitoring of the trader.
          </p>
        </div>

        <div className="aboutCard" style={cardStyle}>
          {" "}
          <h1 style={cardHeaderStyling}>Leader Board</h1>
          <br />
          <p style={aboutTextStyle}>
            <p style={{ paddingTop: "45px" }}>Coming Soon ...</p>
          </p>
        </div>
      </div>
      <div
        style={{
          marginTop: "50px",
          textAlign: "center",
          paddingBottom: "70px",
          paddingTop: "50px",
          display: "flex",
          flexDirection: "center",
          justifyContent: "space-evenly",
        }}
      >
        <div
          className="socialLink"
          href="https://twitter.com/Official_ASDev"
          style={socialStyle}
        >
          <Icon name="twitter" />
          Twitter{" "}
        </div>
        <div
          className="socialLink"
          href="https://github.com/Alpha-Serpentis-Developments/Project-Mimic"
          style={socialStyle}
        >
          <Icon name="github" />
          Github
        </div>
        <div
          className="socialLink"
          href="https://discord.gg/u9wMgBY"
          style={socialStyle}
        >
          <Icon name="discord" />
          Discord
        </div>
      </div>
    </div>
  );
}
