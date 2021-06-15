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
            <div style={{ paddingTop: "15px" }}>
              <Icon name="close" size="big" onClick={props.clickHideSidebar} />
            </div>
          ) : (
            <div style={{ paddingTop: "15px" }}>
              <Icon
                name="sidebar"
                size="big"
                onClick={props.clickShowSidebar}
              />
            </div>
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
}
