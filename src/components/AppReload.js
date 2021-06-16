import React from "react";
import { nwConfig, currentChain, setChain } from "./NetworkConfig";
import { Button, Header, Icon, Modal, Grid } from "semantic-ui-react";

export default function AppReload(props) {
  return (
    <Modal basic open={props.reload} size="small">
      <Header icon>
        <Icon name="attention" />
      </Header>
      <Modal.Content>
        <Grid textAlign="center">
          <p>Changing Network to {nwConfig[currentChain].name}</p>
        </Grid>
      </Modal.Content>
    </Modal>
  );
}
