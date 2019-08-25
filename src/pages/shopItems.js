import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getShop } from "../actions/shopActions";
import axios from "../utils/requestConfig";

import styled from "styled-components";
import { Layout, Table, Button, Icon, Breadcrumb, Sweetalert, Notify } from "zent";

const { Row } = Layout;

class shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {
        pageSize: 10,
        current: this.props.shop.page,
        totalItem: this.props.shop.row
      },
      datasets: []
    };
  }

  static propTypes = {
    shop: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
      page: PropTypes.number.isRequired
    })
  };

  componentDidMount() {
    this.props.getShop();
  }

  componentDidUpdate(prevProps) {
    if (this.props.shop.list.length && this.props.shop.list !== prevProps.shop.list) {
      this.setState({ datasets: this.props.shop.list });
    }
  }

  onChange(data) {
    this.props.getShop(10, data.pageSize);
  }

  itemCategoryById = id => {
    switch (Number(id)) {
      case 1:
        return "Head shape";
      case 2:
        return "Hair";
      case 3:
        return "Eye";
      case 4:
        return "Eyebrows";
      case 5:
        return "Nose";
      case 6:
        return "Mouth";
      case 7:
        return "Facial hair";
      case 8:
        return "Hats";
      case 9:
        return "Glasses";
      case 10:
        return "Signs";
      case 11:
        return "Clothes";
      case 12:
        return "Flag";
      case 13:
        return "Accessories";
      default:
        return "";
    }
  };

  itemTypeById = id => {
    switch (Number(id)) {
      case 1:
        return "Coin";
      case 2:
        return "Avatar Item";
      case 3:
        return "Booster";
      default:
        return "";
    }
  };

  removeItem = id => {
    Sweetalert.confirm({
      confirmType: "success",
      confirmText: "Yes",
      cancelText: "No",
      content: "Are you sure you want to delete this shop item ?",
      title: "Attention",
      className: "custom-sweetalert",
      maskClosable: true,
      parentComponent: this,
      onConfirm: () =>
        new Promise(resolve => {
          this.removeItemAction(id).then(res => {
            resolve();
          });
        })
    });
  };

  removeItemAction = id => {
    return axios
      .delete(`/shopitems/${id}`)
      .then(res => this.props.getShop(10, this.props.shop.page))
      .catch(err => Notify.error(err.data !== null ? err.data.error.errorDescription : "There has been an error processing your request", 5000));
  };

  render() {
    const { isLoading } = this.props.shop;
    const { datasets, page } = this.state;
    const columns = [
      {
        title: "Id",
        name: "id",
        width: "15%"
      },
      {
        title: "Title",
        name: "title",
        width: "20%"
      },
      {
        title: "Type",
        width: "20%",
        bodyRender: data => {
          return this.itemTypeById(data.typeId);
        }
      },
      {
        title: "Category",
        width: "20%",
        bodyRender: data => {
          return this.itemCategoryById(data.avatarCategoryId);
        }
      },
      {
        title: "Price",
        name: "price",
        width: "20%"
      },
      {
        title: "Status",
        width: "20%",
        bodyRender: data => {
          return data.statusId === "1" ? "Available" : "Not Available";
        }
      },
      {
        title: "Edit / Remove",
        width: "20%",
        bodyRender: data => {
          return (
            <ul>
              <li>
                <Link to={`/shop/edit/${data.id}`} />
              </li>
              <li onClick={() => this.removeItem(data.id)} />
            </ul>
          );
        }
      }
    ];
    return (
      <div className="container">
        <Row>
          <Container>
            <Title>Shop Items</Title>
            <Breadcrumb breads={[{ name: "Dashboard", href: "/" }]} />
          </Container>
          <Button type="primary" style={{ float: "right" }} onClick={() => this.props.history.push("/shop/add")}>
            <Icon type="plus" />
            New Item
          </Button>
        </Row>
        <Row>
          <Table
            emptyLabel={isLoading ? "loading" : "there is no item in database"}
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
  shop: state.shop
});

export default connect(
  mapStateToProps,
  { getShop }
)(shop);
