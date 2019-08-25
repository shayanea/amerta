import React, { Component } from "react";
import moment from "moment";

import DatePicker from "react-datepicker";
import Uploader from "../../component/category/uploader";
import axios from "../../utils/requestConfig";
import { Form, Button, Checkbox, Notify } from "zent";

const { FormSelectField, FormInputField, FormCheckboxGroupField, createForm } = Form;

class detail extends Component {
  state = {
    birthDate: moment(),
    checkedList: [],
    cover: null,
    uploadingStatus: 0,
    email: "",
    password: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    nickName: "",
    genderId: 0,
    statusId: 0,
    statusNote: "",
    isLoading: false
  };

  componentDidMount() {
    this.getUserById(this.props.match.params.id);
  }

  getUserById = id => {
    return axios
      .get(`/accounts/${id}`)
      .then(res => {
        this.setState({
          cover: res.data.data.coverImageId !== null ? { fileId: res.data.data.coverImageId } : null,
          email: res.data.data.email,
          password: res.data.data.password,
          phoneNumber: res.data.data.phoneNumber,
          firstName: res.data.data.firstName,
          lastName: res.data.data.lastName,
          nickName: res.data.data.nickName,
          genderId: res.data.data.genderId,
          statusId: res.data.data.statusId,
          statusNote: res.data.data.statusNote === null ? "" : res.data.data.statusNote,
          birthDate: moment(res.data.data.birthDate)
        });
      })
      .catch(err => {
        Notify.error(err.data !== null ? err.data.error.errorDescription : "There has been an error processing your request", 5000);
        this.setState({ isLoading: false });
      });
  };

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

  submit = data => {
    this.setState({ isLoading: true });
    return axios
      .put(`/accounts/${this.props.match.params.id}`, {
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
        isEmailVerified: true,
        isPhoneNumberVerified: true
      })
      .then(res => this.props.history.push("/users"))
      .catch(err => {
        Notify.error(err.data !== null ? err.data.error.errorDescription : "There has been an error processing your request", 5000);
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { handleSubmit } = this.props;
    const { checkedList, birthDate, isLoading, cover, uploadingStatus, email, password, phoneNumber, firstName, lastName, nickName, genderId, statusId, statusNote } = this.state;
    return (
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
          value={email}
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
          value={password}
        />
        <FormInputField name="phoneNumber" label="Phone Number" type="text" placeholder="Phone Number" value={phoneNumber} />
        <FormInputField name="firstName" label="First Name" type="text" placeholder="First Name" value={firstName} />
        <FormInputField name="lastName" type="text" label="Last Name" placeholder="Last Name" value={lastName} />
        <FormInputField name="nickname" type="text" label="Nickname" placeholder="Nickname" value={nickName} />
        <FormSelectField
          autoWidth
          label="Gender"
          placeholder="Please choose gender"
          name="genderTypeId"
          data={[{ value: 1, text: "Male" }, { value: 2, text: "Female" }]}
          value={genderId}
        />
        <FormSelectField
          autoWidth
          label="Status"
          placeholder="Please choose status"
          name="statusId"
          data={[{ value: 1, text: "Active" }, { value: 3, text: "Supend" }]}
          value={statusId}
        />
        <div className="zent-form__control-group ">
          <label className="zent-form__control-label">Birth Date</label>
          <div className="zent-form__controls">
            <div className="zent-input-wrapper">
              <DatePicker selected={birthDate} showYearDropdown onChange={this.handleChange} className="zent-input" />
            </div>
          </div>
        </div>
        <FormInputField name="statusNote" type="textarea" showCount autoSize maxLength={300} label="Note" placeholder="Status note" value={statusNote} />
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
        <Uploader typeId={2} status={1} title={"Cover"} file={cover} onRemoveImage={this.removeImage} onAddImage={this.addImage} onChangeUploadStatus={this.updateUploadStatus} />
        <Button htmlType="submit" className="submit-btn" type="primary" size="large" disabled={uploadingStatus === 1} loading={isLoading}>
          Update
        </Button>
      </Form>
    );
  }
}

const WrappedForm = createForm()(detail);

export default WrappedForm;
