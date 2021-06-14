import React from "react";
import "../App.css";
import profileImg from "../images/profile.png";
import { Icon, Grid, Image } from "semantic-ui-react";

export default function TopSidebar(props) {
  return (
    <div className="topSidebar">
      <Grid>
        <Grid.Column floated="left" width={5}>
          <Image src={profileImg} />
        </Grid.Column>
        <Grid.Column floated="right" width={3}>
          {props.showSidebar ? (
            <Icon name="close" size="big" onClick={props.clickHideSidebar} />
          ) : (
            <Icon name="sidebar" size="big" onClick={props.clickShowSidebar} />
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
}
