import React, { Component } from "react";
import axios from "../../utils/requestConfig";

import styled from "styled-components";
import { Layout, Breadcrumb, Form, Button, Icon, Notify } from "zent";
import Uploader from "../../component/category/uploader";

const { Row } = Layout;
const { FormSelectField, FormInputField, createForm } = Form;

const levels = [];
for (let index = 0; index < 100; index++) {
  levels.push({ value: index + 1, text: index + 1 });
}
class editItem extends Component {
  state = {
    isLoading: true,
    cateories: [],
    hasCategoryLoaded: true,
    uploadingStatus: 0,
    icon: null,
    title: "",
    description: "",
    price: "",
    priceTypeId: 0,
    statusId: 0,
    typeId: 0,
    unlockSky: 0,
    unlockLevel: 0,
    levels: levels,
    avatarCategoryId: 0
  };

  componentDidMount() {
    Promise.all([this.getShopItemById(), this.getCategory()])
      .then(res => {
        this.setState({
          hasCategoryLoaded: true,
          isLoading: false,
          icon: res[0].data.data.imageFileId !== null ? { fileId: res[0].data.data.imageFileId } : null,
          title: res[0].data.data.title,
          description: res[0].data.data.description,
          price: res[0].data.data.price,
          priceTypeId: res[0].data.data.priceTypeId,
          statusId: res[0].data.data.statusId,
          typeId: res[0].data.data.typeId,
          unlockLevel: res[0].data.data.unlockLevel,
          unlockSky: res[0].data.data.unlockSky,
          avatarCategoryId: res[0].data.data.avatarCategoryId
        });
      })
      .catch(err => {
        Notify.error(err.data !== null ? err.data.error.errorDescription : "There has been an error processing your request", 5000);
        this.setState({ hasCategoryLoaded: true, isLoading: false });
      });
  }

  getShopItemById = () => {
    return axios.get(`/shopitems/${this.props.match.params.id}`);
  };

  getCategory = () => {
    return axios.get("/questioncategories");
  };

  addImage = file => this.setState({ icon: file, uploadingStatus: 0 });

  removeImage = () => this.setState({ icon: null });

  updateUploadStatus = status => this.setState({ uploadingStatus: status });

  submit = data => {
    this.setState({ isLoading: true });
    return axios
      .put(`/shopitems/${this.props.match.params.id}`, {
        title: data.title,
        description: data.description,
        typeId: data.typeId,
        avatarCategoryId: data.avatarCategoryId,
        priceTypeId: data.priceTypeId,
        price: data.price,
        imageFileId: this.state.icon !== null ? this.state.icon.fileId : null,
        unlockLevel: data.unlockLevel,
        unlockSky: data.unlockSky,
        statusId: data.statusId
      })
      .then(res => this.props.history.push("/shop"))
      .catch(err => {
        Notify.error(err.data !== null ? err.data.error.errorDescription : "There has been an error processing your request", 5000);
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { handleSubmit } = this.props;
    const { isLoading, icon, uploadingStatus, title, description, price, priceTypeId, statusId, typeId, unlockLevel, unlockSky, avatarCategoryId, levels } = this.state;
    return (
      <div className="container">
        <Row>
          <Container>
            <Title>New Item</Title>
            <Breadcrumb breads={[{ name: "Dashboard", href: "/" }, { name: "Shop", href: "/shop" }, { name: "New Item" }]} />
          </Container>
          <Button type="primary" style={{ float: "right" }} onClick={() => this.props.history.push("/shop")}>
            <Icon type="summary-o" />
            Shop Items List
          </Button>
        </Row>
        <Row>
          <Form disableEnterSubmit={false} className="add-form" horizontal onSubmit={handleSubmit(this.submit)}>
            <FormInputField
              name="title"
              label="Title"
              type="text"
              placeholder="Title"
              validateOnChange={false}
              validateOnBlur={false}
              validations={{
                required: true
              }}
              validationErrors={{
                required: "Please enter your title"
              }}
              value={title}
            />
            <FormSelectField
              autoWidth
              label="Type"
              placeholder="Please choose type"
              name="typeId"
              data={[{ value: 1, text: "Coin" }, { value: 2, text: "Avatar Item" }, { value: 3, text: "Booster" }]}
              value={typeId}
            />
            <FormInputField name="price" label="Price" type="text" placeholder="Price" value={price} />
            <FormSelectField
              autoWidth
              label="Type"
              placeholder="Please choose price type"
              name="priceTypeId"
              data={[{ value: 1, text: "Coin" }, { value: 2, text: "Money" }]}
              value={priceTypeId}
            />
            <FormSelectField
              autoWidth
              placeholder="Please choose category"
              name="avatarCategoryId"
              label="Category"
              data={[
                { id: 1, title: "Head shape" },
                { id: 2, title: "Hair" },
                { id: 3, title: "Eye" },
                { id: 4, title: "Eyebrows" },
                { id: 5, title: "Nose" },
                { id: 6, title: "Mouth" },
                { id: 7, title: "Facial hair" },
                { id: 8, title: "Hats" },
                { id: 9, title: "Glasses" },
                { id: 10, title: "Signs" },
                { id: 11, title: "Clothes" },
                { id: 12, title: "Flag" },
                { id: 13, title: "Accessories" }
              ]}
              optionValue="id"
              optionText="title"
              value={avatarCategoryId}
            />
            <FormInputField name="description" type="textarea" autoSize label="Description" placeholder="Description" value={description} />
            <FormSelectField autoWidth placeholder="Please choose unlock level" name="unlockLevel" label="Unlock Level" data={levels} value={unlockLevel} />
            <FormSelectField
              autoWidth
              placeholder="Please choose unlock sky"
              name="unlockSky"
              label="Unlock Sky"
              data={[
                { value: 1, text: "1" },
                { value: 2, text: "2" },
                { value: 3, text: "3" },
                { value: 4, text: "4" },
                { value: 5, text: "5" },
                { value: 6, text: "6" },
                { value: 7, text: "7" }
              ]}
              value={unlockSky}
            />
            <FormSelectField
              autoWidth
              placeholder="Please choose status"
              name="statusId"
              label="Status"
              data={[{ value: 1, text: "Available" }, { value: 2, text: "Not Available" }]}
              value={statusId}
            />
            <Uploader typeId={4} status={1} title={"Icon"} file={icon} onRemoveImage={this.removeImage} onAddImage={this.addImage} onChangeUploadStatus={this.updateUploadStatus} />
            <Button htmlType="submit" className="submit-btn" type="primary" size="large" disabled={uploadingStatus === 1} loading={isLoading}>
              Update Item
            </Button>
          </Form>
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

const WrappedForm = createForm()(editItem);

export default WrappedForm;
