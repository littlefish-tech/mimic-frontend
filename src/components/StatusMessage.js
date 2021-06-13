import React from "react";
import { Message, Icon } from "semantic-ui-react";

export default function SuccessMessage(props) {
  function makeLink(h) {
    return "https://kovan.etherscan.io/tx/" + h;
  }

  function iconName(s) {
    if (s === "loading") {
      return "circle notched";
    }
    if (s === "error") {
      return "exclamation triangle";
    }
    if (s === "confirmed") {
      return "check circle";
    }
  }
  return (
    <Message negative={props.statusError} size="small" icon>
      <Icon
        name={iconName(props.iconStatus)}
        size="tiny"
        loading={props.iconStatus === "loading"}
      />

      <Message.Content>
        {" "}
        <Message.Header>{props.statusHeader}</Message.Header>
        {props.statusMessage}
        {props.txHash !== "" && (
          <Message.Content size="small">
            TX Hash
            <a href={makeLink(props.txHash)} target="_blank">
              {" "}
              {props.txHash}
            </a>{" "}
          </Message.Content>
        )}
      </Message.Content>
      {/* {props.txHash !== "" && (
        <Message.Content size="small">
          TX Hash
          <a href={makeLink(props.txHash)} target="_blank">
            {" "}
            {props.txHash}
          </a>{" "}
        </Message.Content>
      )} */}
    </Message>
  );
}
