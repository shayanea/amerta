import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Layout } from "zent";

import { getDashboard } from "../actions/dashboardActions";
import Card from "../component/dashaboard/card";
import LineChart from "../component/dashaboard/lineChart";

const { Row } = Layout;

const options1 = {
  chart: {
    type: "line",
    reflow: true,
    width: 600
  },

  credits: {
    enabled: false
  },

  title: {
    text: "User Register"
  },

  xAxis: {
    categories: ["Saturday", "Sunday", "Monday", "Thursday", "Wednesday", "Thursday", "Friday"]
  },

  yAxis: {
    title: {
      text: "Total Registration"
    }
  },

  series: [
    {
      name: "New Users",
      data: [12908, 5948, 8105, 11248, 8989, 11816, 18274]
    }
  ]
};

const options2 = {
  chart: {
    type: "line",
    reflow: true,
    width: 600
  },

  credits: {
    enabled: false
  },

  title: {
    text: "Total Battles"
  },

  xAxis: {
    categories: ["Saturday", "Sunday", "Monday", "Thursday", "Wednesday", "Thursday", "Friday"]
  },

  yAxis: {
    title: {
      text: "Total Battles Per Day"
    }
  },

  series: [
    {
      name: "Battles",
      data: [11744, 17722, 16005, 19771, 20185, 24377, 32147]
    }
  ]
};

const options3 = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: "pie",
    width: 600
  },

  credits: {
    enabled: false
  },

  title: {
    text: "Gender Ratio"
  },

  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
  },

  series: [
    {
      name: "Gender",
      colorByPoint: true,
      data: [
        {
          name: "Men",
          y: 61,
          sliced: true,
          selected: true
        },
        {
          name: "Women",
          y: 39
        }
      ]
    }
  ]
};

const options4 = {
  chart: {
    type: "line",
    reflow: true,
    width: 600
  },

  credits: {
    enabled: false
  },

  title: {
    text: "Total Sales"
  },

  xAxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },

  yAxis: {
    title: {
      text: "Total Sale Per Month"
    }
  },

  series: [
    {
      name: "Sales",
      data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    }
  ]
};

class dashboard extends Component {
  state = {
    usersCount: 0,
    categoriesCount: 0,
    questionsCount: 0
  };

  static propTypes = {
    dashboard: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired
    })
  };

  componentDidMount() {
    this.props.getDashboard();
  }

  componentDidUpdate(prevProps) {
    if (this.props.dashboard.data !== null && this.props.dashboard.data !== prevProps.dashboard.data) {
      this.setState({
        usersCount: this.props.dashboard.data.usersCount,
        categoriesCount: this.props.dashboard.data.categoriesCount,
        questionsCount: this.props.dashboard.data.questionsCount
      });
    }
  }

  render() {
    const { usersCount, categoriesCount, questionsCount } = this.state;
    return (
      <div
        className="container"
        style={{
          backgroundColor: "transparent",
          boxShadow: "none",
          padding: 0
        }}
      >
        <Row>
          <Container>
            <Title>Dashboard</Title>
          </Container>
        </Row>
        <Row>
          <Card width={6} title="Users" value={usersCount} redirect="/users" />
          <Card width={6} title="Battles" value="1437" redirect="/battles" />
          <Card width={6} title="Categories" value={categoriesCount} redirect="/categories" />
          <Card width={6} title="Questions" value={questionsCount} redirect="/questions" />
          <Card width={12} title="Online Users" value="2000" />
          <Card width={12} title="Games In Progress" value="527" />
          <LineChart width={12} options={options1} />
          <LineChart width={12} options={options2} />
          <LineChart width={12} options={options3} />
          <LineChart width={12} options={options4} />
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
  dashboard: state.dashboard
});

export default connect(
  mapStateToProps,
  { getDashboard }
)(dashboard);
