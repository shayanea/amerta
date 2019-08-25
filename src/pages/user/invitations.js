import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUsersInvitation } from "../../actions/usersActions";
import { Table } from "zent";

class Invitations extends Component {
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

  componentDidMount() {
    this.props.getUsersInvitation(10, 1, this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.users.list.length && this.props.users.list !== prevProps.users.list) {
      this.setState({ datasets: this.props.users.list });
    }
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
        title: "Date",
        name: "date",
        width: "10%"
      },
      {
        title: "Email",
        name: "email",
        width: "20%"
      },
      {
        title: "Phone Number",
        name: "phoneNumber",
        width: "20%"
      },
      {
        title: "Status",
        name: "status",
        width: "30%"
      }
    ];
    return (
      <Table
        emptyLabel={isLoading ? "loading" : "there is no invitations in database"}
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
  { getUsersInvitation }
)(Invitations);
