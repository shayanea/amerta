import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getUsers } from "../actions/usersActions";
import axios from "../utils/requestConfig";

import styled from "styled-components";
import { Layout, Table, Button, Icon, Breadcrumb, Sweetalert, Notify } from "zent";

const { Row } = Layout;

class users extends Component {
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
      isLoading: PropTypes.bool.isRequired
    })
  };

  componentDidMount() {
    this.props.getUsers();
  }

  componentDidUpdate(prevProps) {
    if (this.props.users.list !== prevProps.users.list) {
      this.setState({
        datasets: this.props.users.list
      });
    }
  }

  onChange(data) {
    this.setState({
      current: data.current,
      pageSize: data.pageSize
    });
  }

  removeUser = id => {
    Sweetalert.confirm({
      confirmType: "success",
      confirmText: "Yes",
      cancelText: "No",
      content: "Are you sure you want to delete this user ?",
      title: "Attention",
      className: "custom-sweetalert",
      maskClosable: true,
      parentComponent: this,
      onConfirm: () =>
        new Promise(resolve => {
          this.removeUserAction(id).then(res => {
            resolve();
          });
        })
    });
  };

  removeUserAction = id => {
    return axios
      .delete(`/questioncategories/${id}`)
      .then(res => this.props.getUsers(10, this.props.users.page))
      .catch(err => Notify.error(err.data !== null ? err.data.error.errorDescription : "There has been an error processing your request", 5000));
  };

  render() {
    const { page, datasets } = this.state;
    const { isLoading } = this.props.users;
    const columns = [
      {
        title: "Name",
        width: "20%",
        bodyRender: data => {
          return `${data.firstName} ${data.lastName}`;
        }
      },
      {
        title: "Email",
        name: "email",
        width: "40%"
      },
      {
        title: "Nickname",
        name: "nickName",
        width: "20%"
      },
      {
        title: "Phone",
        width: "20%",
        name: "phoneNumber"
      },
      {
        title: "Status",
        width: "20%",
        name: "statusId"
      },
      {
        title: "Edit / Remove",
        width: "20%",
        bodyRender: data => {
          return (
            <ul>
              <li>
                <Link to={`/user/edit/${data.id}`} />
              </li>
              <li onClick={() => this.removeUser(data.id)} />
            </ul>
          );
        }
      }
    ];
    return (
      <div className="container">
        <Row>
          <Container>
            <Title>Users</Title>
            <Breadcrumb breads={[{ name: "Dashboard", href: "/" }]} />
          </Container>
          <Button type="primary" style={{ float: "right" }} onClick={() => this.props.history.push("/users/add")}>
            <Icon type="plus" />
            New User
          </Button>
        </Row>
        <Row>
          <Table
            emptyLabel={isLoading ? "loading" : "there is no users in database"}
            columns={columns}
            datasets={datasets}
            rowKey="id"
            onChange={this.onChange.bind(this)}
            pageInfo={page}
          />
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
  { getUsers }
)(users);
