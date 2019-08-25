import React, { Component } from "react";
import moment from "moment";

import styled from "styled-components";
import { Layout, Breadcrumb, Button, Icon, Form, Notify, Checkbox } from "zent";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Uploader from "../../component/category/uploader";
import axios from "../../utils/requestConfig";
import Avatar from "./avatar";

const { Row } = Layout;
const { FormSelectField, FormInputField, FormCheckboxGroupField, createForm } = Form;

class addUser extends Component {
  state = {
    birthDate: moment(),
    checkedList: [],
    cover: null,
    uploadingStatus: 0,
    isLoading: false,
    avatarPortalVisible: false
  };

  componentDidMount() {
    document.body.classList.add("add-user-page");
  }

  handleChange = date =>
    this.setState({
      birthDate: date
    });

  onCheckboxChange = checkedList => {
    this.setState({ checkedList });
  };

  addImage = file => this.setState({ cover: file, uploadingStatus: 0 });

  removeImage = () => this.setState({ cover: null });

  updateUploadStatus = status => this.setState({ uploadingStatus: status });

  changeAvatarModalStatus = () => this.setState({ avatarPortalVisible: !this.state.avatarPortalVisible });

  submit = data => {
    this.setState({ isLoading: true });
    return axios
      .post("/accounts", {
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        firstName: data.firstName,
        lastName: data.lastName,
        nickname: data.nickname,
        genderTypeId: data.genderTypeId,
        birthDate: this.state.birthDate.format(),
        statusId: data.statusId,
        statusNote: data.statusNote,
        roleIds: this.state.checkedList,
        coverImageFileId: this.state.cover === null ? "" : this.state.cover.fileId,
        isEmailVerified: true,
        isPhoneNumberVerified: true
      })
      .then(res => this.props.history.push("/users"))
      .catch(err => {
        Notify.error(err.data !== null ? err.data.error.errorDescription : "There has been an error processing your request", 5000);
        this.setState({ isLoading: false });
      });
  };

  componentWillUnmount() {
    document.body.classList.remove("add-user-page");
  }

  render() {
    const { handleSubmit } = this.props;
    const { checkedList, birthDate, isLoading, cover, uploadingStatus, avatarPortalVisible } = this.state;
    return (
      <div className="container">
        <Row>
          <Container>
            <Title>New User</Title>
            <Breadcrumb breads={[{ name: "Dashboard", href: "/" }, { name: "Users", href: "/users" }, { name: "New User" }]} />
          </Container>
          <Button type="primary" style={{ float: "right" }} onClick={() => this.props.history.push("/users")}>
            <Icon type="summary-o" />
            Users List
          </Button>
        </Row>
        <Avatar status={avatarPortalVisible} onChangeAvatarModalStatus={this.changeAvatarModalStatus} />
        <Row>
          <Form disableEnterSubmit={false} className="add-form" horizontal onSubmit={handleSubmit(this.submit)}>
            <FormInputField
              name="email"
              label="Email"
              type="text"
              placeholder="Email"
              validateOnChange={false}
              validateOnBlur={false}
              validations={{
                isEmail: true,
                required: true
              }}
              validationErrors={{
                isEmail: "Please enter the right email",
                required: "Please enter your email"
              }}
            />
            <FormInputField
              name="password"
              label="Password"
              type="password"
              placeholder="Password"
              validateOnChange={false}
              validateOnBlur={false}
              validations={{
                required: true
              }}
              validationErrors={{
                required: "Please enter your password"
              }}
            />
            <FormInputField name="phoneNumber" label="Phone Number" type="text" placeholder="Phone Number" />
            <FormInputField name="firstName" label="First Name" type="text" placeholder="First Name" />
            <FormInputField name="lastName" type="text" label="Last Name" placeholder="Last Name" />
            <FormInputField name="nickname" type="text" label="Nickname" placeholder="Nickname" />
            <FormSelectField autoWidth label="Gender" placeholder="Please choose gender" name="genderTypeId" data={[{ value: 1, text: "Male" }, { value: 2, text: "Female" }]} />
            <FormSelectField autoWidth label="Status" placeholder="Please choose status" name="statusId" data={[{ value: 1, text: "Active" }, { value: 3, text: "Supend" }]} />
            <div className="zent-form__control-group ">
              <label className="zent-form__control-label">Birth Date</label>
              <div className="zent-form__controls">
                <div className="zent-input-wrapper">
                  <DatePicker selected={birthDate} showYearDropdown onChange={this.handleChange} className="zent-input" />
                </div>
              </div>
            </div>
            <FormInputField name="statusNote" type="textarea" showCount autoSize maxLength={300} label="Note" placeholder="Status note" />
            <FormCheckboxGroupField
              name="roleIds"
              label="Roles:"
              value={checkedList}
              onChange={this.onCheckboxChange}
              required
              validations={{
                minLength: 1
              }}
              validationErrors={{
                minLength: "Please choose roles."
              }}
            >
              <Checkbox value="1">Admin</Checkbox>
              <Checkbox value="2">Player</Checkbox>
              <Checkbox value="3">Limited Admin 1</Checkbox>
              <Checkbox value="4">Limited Admin 2</Checkbox>
            </FormCheckboxGroupField>
            <Uploader
              typeId={2}
              status={1}
              title={"Cover"}
              file={cover}
              onRemoveImage={this.removeImage}
              onAddImage={this.addImage}
              onChangeUploadStatus={this.updateUploadStatus}
            />
            <div className="zent-form__control-group ">
              <label className="zent-form__control-label">Avatar</label>
              <div className="zent-form__controls">
                <div className="zent-input-wrapper">
                  <Button className="pick-avatar" type="default" size="large" onClick={this.changeAvatarModalStatus}>
                    Create avatar
                  </Button>
                </div>
              </div>
            </div>
            <Button htmlType="submit" className="submit-btn" type="primary" size="large" disabled={uploadingStatus === 1} loading={isLoading}>
              Create User
            </Button>
          </Form>
        </Row>
      </div>
    );
  }
}

const WrappedForm = createForm()(addUser);

export default WrappedForm;

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
