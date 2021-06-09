import React from "react";
import { Icon } from "semantic-ui-react";

import profileImg from "../images/profile.png";

export default function Introduction() {
  return (
    <div style={{ backgroundColor: "rgb(232,219,239)", height: "600px" }}>
      <img
        src={profileImg}
        style={{
          height: "300px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
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
      <ul
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: "50px",
        }}
      >
        <a
          href="https://twitter.com/Official_ASDev"
          style={{
            textDecoration: "none",
            color: "black",
            fontSize: "15px",
            fontWeight: "bold",
          }}
        >
          <Icon name="twitter" />
          Twitter{" "}
        </a>
        <a
          href="https://github.com/Alpha-Serpentis-Developments/Project-Mimic"
          style={{
            textDecoration: "none",
            color: "black",
            fontSize: "15px",
            fontWeight: "bold",
          }}
        >
          <Icon name="github" />
          Github
        </a>
        <a
          href="https://discord.gg/u9wMgBY"
          style={{
            textDecoration: "none",
            color: "black",
            fontSize: "15px",
            fontWeight: "bold",
          }}
        >
          <Icon name="discord" />
          Discord
        </a>
      </ul>
    </div>
  );
}
