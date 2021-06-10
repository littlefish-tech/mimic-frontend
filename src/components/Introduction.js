import React from "react";
import { Icon, Card } from "semantic-ui-react";

import profileImg from "../images/profile.png";

import "../App.css";

export default function Introduction() {
  const optionalImg = {
    height: "300px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const cardStyle = {
    width: "500px",
    textAlign: "center",
    lineHeight: "1.5,",
    fontSize: "20px",
    borderRadius: "30px",
    marginTop: "50px",
    boxShadow:
      "0 20px 40px 0 rgba(0, 0, 0, 0.2), 0 16px 40px 0 rgba(0, 0, 0, 0.19)",
    marginLeft: "20px",
    transition: "transform 0.5s",
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
          {" "}
          <h2 style={{ paddingTop: "45px" }}>About Optional</h2>
          <br />
          <p style={aboutTextStyle}>
            Optional is a Decentralized trading platform build on top of Opyn.
            Optional is a Decentralized trading platform build on top of Opyn.
            Optional is a Decentralized trading platform build on top of Opyn.
            Optional is a Decentralized trading platform build on top of Opyn.
          </p>
        </div>
        <div className="aboutCard" style={cardStyle}>
          {" "}
          <h2 style={{ paddingTop: "45px" }}>About Optional</h2>
          <br />
          <p style={aboutTextStyle}>
            Optional is a Decentralized trading platform build on top of Opyn.
            Optional is a Decentralized trading platform build on top of Opyn.
            Optional is a Decentralized trading platform build on top of Opyn.
            Optional is a Decentralized trading platform build on top of Opyn.
          </p>
        </div>
        <div className="aboutCard" style={cardStyle}>
          {" "}
          <h2 style={{ paddingTop: "45px" }}>About Optional</h2>
          <br />
          <p style={aboutTextStyle}>
            Optional is a Decentralized trading platform build on top of Opyn.
            Optional is a Decentralized trading platform build on top of Opyn.
            Optional is a Decentralized trading platform build on top of Opyn.
            Optional is a Decentralized trading platform build on top of Opyn.
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
