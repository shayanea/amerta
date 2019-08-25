import React, { Component } from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import { Layout, Breadcrumb, Button, Icon, Tabs } from "zent";

import Detail from "./detail";
import Stats from "./stats";
import Transactions from "./transactions";
import Achievements from "./achievements";
import Battles from "./battles";
import Invitations from "./invitations";
import Logs from "./logs";

const { Row } = Layout;
const TabPanel = Tabs.TabPanel;

class addUser extends Component {
  state = {
    activeId: "1"
  };

  onTabChange = id => {
    this.setState({
      activeId: id
    });
  };

  render() {
    return (
      <div className="container">
        <Row>
          <Container>
            <Title>Edit User</Title>
            <Breadcrumb breads={[{ name: "Dashboard", href: "/" }, { name: "Users", href: "/users" }, { name: "Edit User" }]} />
          </Container>
          <Button type="primary" style={{ float: "right" }} onClick={() => this.props.history.push("/users")}>
            <Icon type="summary-o" />
            Users List
          </Button>
        </Row>
        <Row>
          <Tabs activeId={this.state.activeId} onChange={this.onTabChange}>
            <TabPanel tab="User Info" id="1">
              <Detail match={this.props.match} />
            </TabPanel>
            <TabPanel tab="Stats" id="2">
              <Stats match={this.props.match} />
            </TabPanel>
            <TabPanel tab="Items" id="3" />
            <TabPanel tab="Transactions" id="4">
              <Transactions />
            </TabPanel>
            <TabPanel tab="Achievements" id="5">
              <Achievements match={this.props.match} />
            </TabPanel>
            <TabPanel tab="Invitations" id="6">
              <Invitations match={this.props.match} />
            </TabPanel>
            <TabPanel tab="Battles History" id="7">
              <Battles />
            </TabPanel>
            <TabPanel tab="Logs" id="8">
              <Logs />
            </TabPanel>
          </Tabs>
        </Row>
      </div>
    );
  }
}

const Container = styled.div`
  display: inline-flex;
  margin-bottom: 15px;
  margin-left: 10px;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.2em;
  color: #000;
  display: inline-block;
  margin-right: 15px;
`;

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  {}
)(addUser);
