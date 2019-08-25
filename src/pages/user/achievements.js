import React, { Component } from "react";
import { Layout, Notify } from "zent";
import axios from "../../utils/requestConfig";
import Loading from "../../utils/loading";

const { Row } = Layout;

class Achievements extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    this.getAchievements();
  }

  getAchievements = () => {
    return axios
      .get(`/achievements?AccountId=${this.props.match.params.id}`)
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
    return <div>{isLoading && <Loading />}</div>;
  }
}

export default Achievements;
