import React from "react";
import { Icon } from "semantic-ui-react";

import "../App.css";

export default function SuccessMessage() {
  const socialStyle = {
    textDecoration: "none",
    color: "purple",
    fontSize: "20px",
    fontWeight: "bold",
    transition: "transform 0.5s",
    cursor: "pointer",
    textShadow: "2px 2px 8px black",
  };
  return (
    <div
      style={{
        textAlign: "center",
        paddingBottom: "10px",
        paddingTop: "10px",
        display: "flex",
        flexDirection: "center",
        justifyContent: "space-evenly",
        // backgroundColor: "white",
        position: "fixed",
        left: "0",
        bottom: "0",
        width: "100%",
      }}
    >
      <div>
        <a
          className="socialLink"
          href="https://twitter.com/Official_ASDev"
          style={socialStyle}
        >
          <Icon name="twitter" />
          Twitter{" "}
        </a>
      </div>
      <div>
        <a
          className="socialLink"
          href="https://github.com/Alpha-Serpentis-Developments/Project-Mimic"
          style={socialStyle}
        >
          <Icon name="github" />
          Github
        </a>
      </div>
      <div>
        <a
          className="socialLink"
          href="https://discord.gg/u9wMgBY"
          style={socialStyle}
        >
          <Icon name="discord" />
          Discord
        </a>
      </div>
    </div>
  );
}
