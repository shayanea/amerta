import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Layout, Table } from "zent";

const { Row } = Layout;

class TransactionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {
        pageSize: 10,
        current: this.props.users.page,
        totalItem: this.props.users.row
      },
      datasets: []
    };
  }

  static propTypes = {
    users: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
      page: PropTypes.number.isRequired
    })
  };

  onChange(data) {
    this.setState({
      current: data.current,
      pageSize: data.pageSize
    });
  }

  render() {
    const { datasets, page } = this.state;
    const { isLoading } = this.props.users;
    const columns = [
      {
        title: "Id",
        name: "id",
        width: "10%"
      },
      {
        title: "Date",
        name: "date",
        width: "20%"
      },
      {
        title: "Type",
        name: "type",
        width: "20%"
      },
      {
        title: "Amount",
        name: "amount",
        width: "20%"
      },
      {
        title: "Description",
        name: "description",
        width: "30%"
      }
    ];
    return (
      <Table
        emptyLabel={isLoading ? "loading" : "there is no transactions in database"}
        columns={columns}
        datasets={datasets}
        rowKey="id"
        onChange={this.onChange.bind(this)}
        pageInfo={page}
      />
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  {}
)(TransactionsList);
