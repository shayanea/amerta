import React, { Component } from "react";
import { Layout, Notify } from "zent";
import styled from "styled-components";
import axios from "../../utils/requestConfig";
import Loading from "../../utils/loading";

import Card from "../../component/users/card";
const { Row } = Layout;

class Stats extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    this.getStatsInformation();
  }

  getStatsInformation = () => {
    return axios
      .get(`/stats?AccountId=${this.props.match.params.id}`)
      .then(res => {
        console.log(res.data.data);
        this.setState({ isLoading: false });
      })
      .catch(err => {
        Notify.error(err.data !== null ? err.data.error.errorDescription : "There has been an error processing your request", 5000);
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { isLoading } = this.state;
    return (
      <Row>
        <Card title="Level" value="12" />
        <Card title="Coin" value="1,346" />
        <Card title="Rank" value="264,467" />
        <Card title="Total Point" value="23,355" />
        <Card title="Played Games" value="1,274" />
        <Card title="Win/Draw/Lose" value="12/2/5" />
        <Container>
          <li>
            <span>Total Battles Played</span>
            <span>635</span>
          </li>
          <li>
            <span>Win</span>
            <span>433 (63%)</span>
          </li>
          <li>
            <span>Draw</span>
            <span>103 (19%)</span>
          </li>
          <li>
            <span>Lose</span>
            <span>99 (18%)</span>
          </li>
          <li>
            <span>Total Group Games</span>
            <span>63</span>
          </li>
          <li>
            <span>Ace Wins</span>
            <span>12</span>
          </li>
          <li>
            <span>Continius Active Days Record</span>
            <span>17</span>
          </li>
          <li>
            <span>Last Play Date Time</span>
            <span>12 oct 2018 - 17:23:12</span>
          </li>
          <li>
            <span>Purchased Items</span>
            <span>15</span>
          </li>
          <li>
            <span>Invited People</span>
            <span>8</span>
          </li>
          <li>
            <span>Gifted Coins</span>
            <span>3500</span>
          </li>
          <li>
            <span>Unlocked Achievements</span>
            <span>6</span>
          </li>
          <li>
            <span>Top 3 Skills</span>
            <span>Art - History - IT</span>
          </li>
        </Container>
        {isLoading && <Loading />}
      </Row>
    );
  }
}

const Container = styled.div`
  display: flex;
  clear: both;
  margin: 15px 10px;
  flex-direction: column;
  & li {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    justify-items: flex-start;
    text-align: left;
    padding: 10px;
    flex: 1 1 100%;

    &:nth-child(odd) {
      background-color: #eee;
    }
    & span {
      color: #444;
      font-size: 14px;
    }
  }
`;

export default Stats;
