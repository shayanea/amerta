import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

import { Form, Button } from "zent";
import styled from "styled-components";
import Bg from "../assets/images/bg.jpg";
const { FormCheckboxField, FormInputField, createForm } = Form;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Column = styled.div`
  background-color: #fff;
  min-height: 100vh;
  display: inline-flex;
  flex: 1;
  position: relative;
  &:last-child {
    flex: 2;
    background-position: center;
    background-size: cover;
    background-image: url(${Bg});
  }
`;

const FormTitle = styled.h2`
  color: #444;
  font-size: 1.5em;
  margin-bottom: 25px;
`;

const ForgetPassword = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 25px 10%;
  border-top: 1px solid #eee;
  a {
    color: #999;
    font-size: 14px;
  }
`;

class login extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired
    })
  };

  submit = data => {
    this.props.loginUser({
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe === "" ? false : data.rememberMe
    });
  };

  render() {
    const { handleSubmit } = this.props;
    const { isLoading } = this.props.auth;
    return (
      <Container>
        <Column>
          <Form disableEnterSubmit={false} className="login-form" horizontal onSubmit={handleSubmit(this.submit)}>
            <FormTitle>Sign In To Amerta App</FormTitle>
            <FormInputField
              name="email"
              type="text"
              label=""
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
              type="password"
              label=""
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
            <FormCheckboxField name="rememberMe" label="">
              Remember me
            </FormCheckboxField>
            <Button htmlType="submit" className="submit-btn" type="primary" size="large" loading={isLoading}>
              Sign In
            </Button>
            <ForgetPassword>
              <Link to="/forgetpassword">Forgot Password ?</Link>
            </ForgetPassword>
          </Form>
        </Column>
        <Column />
      </Container>
    );
  }
}

const WrappedForm = createForm()(login);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(WrappedForm);
