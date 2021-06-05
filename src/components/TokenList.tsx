import React, { useState } from "react";
import { List } from "semantic-ui-react";
import { Header, Modal, Button } from "semantic-ui-react";
import ERCTokenInfo from "./ERCTokenInfo";
import VaultTokenInfo from "./VaultTokenInfo";

export default function TokenList(props: {
  tList: Object[];
  update: number;
  title: string;
  acct: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [clickedItem, setClickedItem] = useState<Object | null>();

  function showTokenInfo(e: any, i: any) {
    setClickedItem(i.value);
    setOpen(true);
  }

  return (
    <div>
      <div>
        <Header size="large" color="blue">
          {props.title}
        </Header>
        <List>
          {props.tList.map((item: any, i) => {
            return (
              <List.Item
                key={i}
                onClick={showTokenInfo}
                value={item}
                verticalAlign="top"
                disabled={!item.status}
                celled
                size="medium"
              >
                {item.name()}
                {/* {item.asset !== "" ? " **get it" : " not received"} */}
              </List.Item>
            );
          })}
        </List>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} closeIcon>
        <Modal.Header>
          <ERCTokenInfo token={clickedItem} acct={props.acct} />
        </Modal.Header>
        <Modal.Content>
          <VaultTokenInfo token={clickedItem} acct={props.acct} />
        </Modal.Content>
        <Modal.Actions></Modal.Actions>
      </Modal>
    </div>
  );
}
