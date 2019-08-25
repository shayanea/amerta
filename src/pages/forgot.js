import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/requestConfig";

import { Form, Button, Notify } from "zent";
import styled from "styled-components";
import Bg from "../assets/images/bg.jpg";
const { FormInputField, createForm } = Form;

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

class ForgotPassword extends Component {
	state = {
		isLoading: false
	};

	submit = data => {
		this.setState({ isLoading: true });
		axios
			.post("/accounts/resetpasswordrequests", { email: data.email })
			.then(res => {
				Notify.success("Check your inbox for a password reset email", 5000);
				this.setState({ isLoading: false });
			})
			.catch(err => {
				Notify.error(
					err.data !== null && typeof err.data !== "undefined"
						? err.data.error.errorDescription
						: "There has been an error processing your request",
					5000
				);
				this.setState({ isLoading: false });
			});
	};

	render() {
		const { handleSubmit } = this.props;
		const { isLoading } = this.state;
		return (
			<Container>
				<Column>
					<Form
						disableEnterSubmit={false}
						className="login-form"
						horizontal
						onSubmit={handleSubmit(this.submit)}
					>
						<FormTitle>Forgot Password</FormTitle>
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
						<Button
							htmlType="submit"
							className="submit-btn"
							type="primary"
							size="large"
							loading={isLoading}
						>
							Submit
						</Button>
						<ForgetPassword>
							<Link to="/login">Sign In</Link>
						</ForgetPassword>
					</Form>
				</Column>
				<Column />
			</Container>
		);
	}
}

const WrappedForm = createForm()(ForgotPassword);

export default WrappedForm;
