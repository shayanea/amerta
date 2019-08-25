import React, { Component } from "react";
import axios from "../../utils/requestConfig";

import styled from "styled-components";
import { Layout, Breadcrumb, Form, Button, Icon, Notify } from "zent";
import Uploader from "../../component/category/uploader";

const { Row } = Layout;
const { FormSelectField, FormInputField, createForm } = Form;

class addCategory extends Component {
  state = {
    isLoading: true,
    icon: null,
    cover: null,
    uploadingStatus: 0,
    title: "",
    statusId: 0,
    description: ""
  };

  componentDidMount() {
    this.fetchCategoryById(this.props.match.params.id);
  }

  fetchCategoryById = id => {
    this.setState({ isLoading: true });
    return axios
      .get(`/questioncategories/${id}`)
      .then(res =>
        this.setState({
          title: res.data.data.title,
          description: res.data.data.description,
          statusId: res.data.data.statusId,
          icon: res.data.data.iconFileId !== "" ? { fileId: res.data.data.iconFileId } : null,
          cover: res.data.data.coverImageFileId !== "" ? { fileId: res.data.data.coverImageFileId } : null,
          isLoading: false
        })
      )
      .catch(err => {
        Notify.error(err.data !== null ? err.data.error.errorDescription : "There has been an error processing your request", 5000);
        this.setState({ isLoading: false });
      });
  };

  addImage = (file, status) => {
    Number(status) === 1 ? this.setState({ icon: file, uploadingStatus: 0 }) : this.setState({ cover: file, uploadingStatus: 0 });
  };

  removeImage = status => {
    Number(status) === 1 ? this.setState({ icon: null }) : this.setState({ cover: null });
  };

  updateUploadStatus = status => this.setState({ uploadingStatus: status });

  submit = data => {
    return axios
      .put(`/questioncategories/${this.props.match.params.id}`, {
        title: data.title,
        iconFileId: this.state.icon === null ? "" : this.state.icon.fileId,
        coverImageFileId: this.state.cover === null ? "" : this.state.cover.fileId,
        statusId: data.statusId,
        description: data.description
      })
      .then(res => {
        Notify.success("Category updated successfully", 3000);
        this.props.history.push("/categories");
      })
      .catch(err => {
        Notify.error(err.data !== null ? err.data.error.errorDescription : "There has been an error processing your request", 5000);
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { handleSubmit } = this.props;
    const { isLoading, uploadingStatus, cover, icon, title, description, statusId } = this.state;
    return (
      <div className="container">
        <Row>
          <Container>
            <Title>New Category</Title>
            <Breadcrumb breads={[{ name: "Dashboard", href: "/" }, { name: "Categories", href: "/categories" }, { name: "New Category" }]} />
          </Container>
          <Button type="primary" style={{ float: "right" }} onClick={() => this.props.history.push("/categories")}>
            <Icon type="summary-o" />
            Category List
          </Button>
        </Row>
        <Row>
          <Form disableEnterSubmit={false} className="add-form" horizontal onSubmit={handleSubmit(this.submit)}>
            <Uploader typeId={6} status={1} title={"Icon"} file={icon} onRemoveImage={this.removeImage} onAddImage={this.addImage} onChangeUploadStatus={this.updateUploadStatus} />
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
              placeholder="Please choose status"
              name="statusId"
              label="Status"
              data={[{ value: 1, text: "Active" }, { value: 2, text: "Deactive" }]}
              value={statusId}
            />
            <FormInputField name="description" type="textarea" showCount autoSize maxLength={300} label="Description" placeholder="Description" value={description} />
            <Uploader
              typeId={7}
              status={2}
              title={"Cover"}
              file={cover}
              onRemoveImage={this.removeImage}
              onAddImage={this.addImage}
              onChangeUploadStatus={this.updateUploadStatus}
            />
            <Button htmlType="submit" className="submit-btn" type="primary" size="large" disabled={uploadingStatus === 1} loading={isLoading}>
              Update Category
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

const WrappedForm = createForm()(addCategory);

export default WrappedForm;
