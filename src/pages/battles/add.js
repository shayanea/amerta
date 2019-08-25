import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styled from "styled-components";
import { Layout, Breadcrumb, Form, Button, Icon } from "zent";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

const { Row } = Layout;
const { FormSelectField, FormInputField, FormNumberInputField, FormCheckboxField, Fieldset, createForm } = Form;

class addBattle extends Component {
  state = {
    startDate: moment()
  };

  static propTypes = {
    battle: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired
    })
  };

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  submit = data => {};

  render() {
    const { startDate } = this.state;
    const { handleSubmit } = this.props;
    const { isLoading } = this.props.battle;
    return (
      <div className="container">
        <Row>
          <Container>
            <Title>New Battle</Title>
            <Breadcrumb breads={[{ name: "Dashboard", href: "/" }, { name: "Categories", href: "/battles" }, { name: "New Battle" }]} />
          </Container>
          <Button type="primary" style={{ float: "right" }} onClick={() => this.props.history.push("/battles")}>
            <Icon type="summary-o" />
            Battles List
          </Button>
        </Row>
        <Row>
          <Form disableEnterSubmit={false} className="add-form" horizontal onSubmit={handleSubmit(this.submit)}>
            <FormInputField name="title" label="Title" type="text" placeholder="Title" />
            <FormSelectField
              label="Type"
              autoWidth
              placeholder="Please choose battle type"
              name="type"
              data={[{ value: 1, text: "Head-To-Head" }, { value: 2, text: "Elimination" }, { value: 3, text: "League" }, { value: 4, text: "Team Skill Battle" }]}
            />
            <FormNumberInputField name="count" label="Player Count" type="text" placeholder="Player Count" />
            <FormInputField name="description" type="textarea" autoSize label="" placeholder="Description" />
            <Fieldset legend="Terms and Conditions">
              <FormInputField name="amount" label="Entrance Amount" type="text" placeholder="Entrance Amount" />
              <FormSelectField autoWidth placeholder="Please choose minimum level" name="type" label="Minimum Level" data={[{ value: 1, text: "1" }, { value: 3, text: "2" }]} />
              <FormSelectField autoWidth placeholder="Please choose maximum level" name="type" label="Maximum Level" data={[{ value: 1, text: "1" }, { value: 3, text: "2" }]} />
              <FormInputField name="minimumScore" label="Minimum Score" type="text" placeholder="Minimum Score" />
              <FormInputField name="maximumScore" label="Maximum Score" type="text" placeholder="Maximum Score" />
              <FormInputField name="minimumRank" label="Minimum Rank" type="text" placeholder="Minimum Rank" />
              <FormInputField name="maximumRank" label="Maximum Rank" type="text" placeholder="Maximum Rank" />
              <FormSelectField autoWidth placeholder="Please choose minimum sky" name="minimumSky" label="Minimum Sky" data={[{ value: 1, text: "1" }, { value: 3, text: "2" }]} />
              <FormSelectField autoWidth placeholder="Please choose maximum sky" name="maximumSky" label="Maximum Sky" data={[{ value: 1, text: "1" }, { value: 3, text: "2" }]} />
            </Fieldset>
            <div className="zent-form__control-group ">
              <label className="zent-form__control-label">Registration Openning Date</label>
              <div className="zent-form__controls">
                <div className="zent-input-wrapper">
                  <DatePicker selected={startDate} onChange={this.handleChange} className="zent-input" />
                </div>
              </div>
            </div>
            <div className="zent-form__control-group ">
              <label className="zent-form__control-label">Registration Closing Date</label>
              <div className="zent-form__controls">
                <div className="zent-input-wrapper">
                  <DatePicker selected={startDate} onChange={this.handleChange} className="zent-input" />
                </div>
              </div>
            </div>
            <div className="zent-form__control-group ">
              <label className="zent-form__control-label">Battle Start Date</label>
              <div className="zent-form__controls">
                <div className="zent-input-wrapper">
                  <DatePicker selected={startDate} onChange={this.handleChange} className="zent-input" />
                </div>
              </div>
            </div>
            <FormSelectField autoWidth placeholder="Please choose status" name="status" label="Status" data={[{ value: 1, text: "1" }, { value: 3, text: "2" }]} />
            <FormCheckboxField name="private" label="">
              Battle is private
            </FormCheckboxField>
            <Button htmlType="submit" className="submit-btn" type="primary" size="large" loading={isLoading}>
              Create Battle
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

const WrappedForm = createForm()(addBattle);

const mapStateToProps = state => ({
  battle: state.battle
});

export default connect(
  mapStateToProps,
  {}
)(WrappedForm);
