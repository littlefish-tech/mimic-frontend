import React, { useState } from "react";
import { List } from "semantic-ui-react";
import { Header, Modal, Button, Icon, Grid } from "semantic-ui-react";
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
                // disabled={!item.status}
                celled
                size="large"
              >
                <Header>{item.name()}</Header>

                {item.expireTime !== -1 &&
                  item.expireTime > Date.now() / 1000 && (
                    <Icon name="clock outline" size="large" color="teal" />
                  )}
                {item.expireTime !== -1 &&
                  item.expireTime < Date.now() / 1000 && (
                    <Icon name="lock" size="large" color="red" />
                  )}
                {/* {item.asset !== "" ? " **get it" : " not received"} */}
              </List.Item>
            );
          })}
        </List>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} closeIcon size="small">
        {/* <Modal.Header>
          <ERCTokenInfo token={clickedItem} acct={props.acct} />
        </Modal.Header> */}
        <Modal.Content>
          <VaultTokenInfo token={clickedItem} acct={props.acct} />
        </Modal.Content>
      </Modal>
    </div>
  );
}
