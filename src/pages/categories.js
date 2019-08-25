import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getCategories } from "../actions/categoryActions";
import axios from "../utils/requestConfig";

import styled from "styled-components";
import { Layout, Table, Button, Icon, Breadcrumb, Sweetalert, Notify } from "zent";

const { Row } = Layout;

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {
        pageSize: 10,
        current: this.props.category.page,
        totalItem: this.props.category.row
      },
      datasets: []
    };
  }

  static propTypes = {
    category: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
      page: PropTypes.number.isRequired
    })
  };

  componentDidMount() {
    this.props.getCategories();
  }

  componentDidUpdate(prevProps) {
    if (this.props.category.list.length && this.props.category.list !== prevProps.category.list) {
      this.setState({
        datasets: this.props.category.list
      });
    }
  }

  onChange(data) {
    this.setState({
      current: data.current,
      pageSize: data.pageSize
    });
  }

  removeCategory = id => {
    Sweetalert.confirm({
      confirmType: "success",
      confirmText: "Yes",
      cancelText: "No",
      content: "Are you sure you want to delete this category ?",
      title: "Attention",
      className: "custom-sweetalert",
      maskClosable: true,
      parentComponent: this,
      onConfirm: () =>
        new Promise(resolve => {
          this.removeCategoryAction(id).then(res => {
            resolve();
          });
        })
    });
  };

  removeCategoryAction = id => {
    return axios
      .delete(`/questioncategories/${id}`)
      .then(res => this.props.getCategories(10, this.props.category.page))
      .catch(err => Notify.error(err.data !== null ? err.data.error.errorDescription : "There has been an error processing your request", 5000));
  };

  render() {
    const { datasets, page } = this.state;
    const { isLoading } = this.props.category;
    const columns = [
      {
        title: "Id",
        name: "id",
        width: "20%"
      },
      {
        title: "Title",
        name: "title",
        width: "40%"
      },
      {
        title: "Status",
        width: "20%",
        bodyRender: data => {
          return data.statusId === "1" ? "active" : "suspend";
        }
      },
      {
        title: "Question Count",
        width: "20%",
        bodyRender: data => {
          return 0;
        }
      },
      {
        title: "Edit / Remove",
        width: "20%",
        bodyRender: data => {
          return (
            <ul>
              <li>
                <Link to={`/category/edit/${data.id}`} />
              </li>
              <li onClick={() => this.removeCategory(data.id)} />
            </ul>
          );
        }
      }
    ];
    return (
      <div className="container">
        <Row>
          <Container>
            <Title>Categories</Title>
            <Breadcrumb breads={[{ name: "Dashboard", href: "/" }]} />
          </Container>
          <Button type="primary" style={{ float: "right" }} onClick={() => this.props.history.push("/category/add")}>
            <Icon type="plus" />
            New Category
          </Button>
        </Row>
        <Row>
          <Table
            emptyLabel={isLoading ? "loading" : "there is no category in database"}
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
  category: state.category
});

export default connect(
  mapStateToProps,
  { getCategories }
)(CategoryList);
