import React, { Component } from "react";
import axios from "../../utils/requestConfig";

import styled from "styled-components";
import { Layout, Breadcrumb, Form, Button, Icon, Radio, Notify } from "zent";
import Loading from "../../utils/loading";

const { Row } = Layout;
const { FormSelectField, FormInputField, FormRadioGroupField, createForm } = Form;

class addQuestion extends Component {
  state = {
    hasCategoryLoaded: false,
    isLoading: true,
    cateories: [],
    selectedCategories: [],
    body: "",
    difficulty: 0,
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctAnswerNumber: 0
  };

  componentDidMount() {
    Promise.all([this.getQuestionById(this.props.match.params.id), this.getCategory()])
      .then(res => {
        this.setState({
          cateories: res[1].data.data,
          hasCategoryLoaded: true,
          body: res[0].data.data.body,
          difficulty: res[0].data.data.difficulty,
          answer1: res[0].data.data.answer1,
          answer2: res[0].data.data.answer2,
          answer3: res[0].data.data.answer3,
          answer4: res[0].data.data.answer4,
          correctAnswerNumber: JSON.stringify(res[0].data.data.correctAnswerNumber),
          isLoading: false
        });
      })
      .catch(err => {
        Notify.error(err.data !== null && typeof err.data !== "undefined" ? err.data.error.errorDescription : "There has been an error processing your request", 5000);
        this.setState({ hasCategoryLoaded: true, isLoading: false });
      });
  }

  getCategory = () => {
    return axios.get("/questioncategories");
  };

  getQuestionById = id => {
    return axios.get(`/questions/${id}`);
  };

  changeCategory = (e, item) => this.setState({ selectedCategories: item });

  submit = data => {
    this.setState({ isLoading: true });
    return axios
      .put(`/questions/${this.props.match.params.id}`, {
        body: data.body,
        difficulty: data.difficulty,
        answer1: data.answer1,
        answer2: data.answer2,
        answer3: data.answer3,
        answer4: data.answer4,
        correctAnswerNumber: data.correctAnswerNumber,
        categoryIds: this.state.selectedCategories
      })
      .then(res => this.props.history.push("/questions"))
      .catch(err => {
        this.setState({ isLoading: false });
        Notify.error(err.data !== null && typeof err.data !== "undefined" ? err.data.error.errorDescription : "There has been an error processing your request", 5000);
      });
  };

  render() {
    const { handleSubmit } = this.props;
    const { isLoading, hasCategoryLoaded, cateories, body, answer1, answer2, answer3, answer4, difficulty, correctAnswerNumber } = this.state;
    return (
      <div className="container">
        <Row>
          <Container>
            <Title>New Question</Title>
            <Breadcrumb breads={[{ name: "Dashboard", href: "/" }, { name: "Questions", href: "/questions" }, { name: "New Question" }]} />
          </Container>
          <Button type="primary" style={{ float: "right" }} onClick={() => this.props.history.push("/questions")}>
            <Icon type="summary-o" />
            Question List
          </Button>
        </Row>
        <Row>
          <Form disableEnterSubmit={false} className="add-form" horizontal onSubmit={handleSubmit(this.submit)}>
            <FormSelectField
              autoWidth
              label="Category"
              emptyText="there is no category in database"
              placeholder="Please choose category"
              name="categoryIds"
              onChange={this.changeCategory}
              filter={(item, keyword) => item.title.indexOf(keyword) > -1}
              data={cateories}
              optionValue="id"
              optionText="title"
              tags
            />
            <FormInputField name="body" type="textarea" autoSize label="Body" placeholder="Body" value={body} />
            <FormSelectField
              autoWidth
              placeholder="Please choose difficulty level"
              name="difficulty"
              label="Difficulty Level"
              data={[{ value: 1, text: "easy" }, { value: 2, text: "normal" }, { value: 3, text: "hard" }]}
              value={difficulty}
            />
            <FormInputField
              name="answer1"
              label="Answer 1"
              type="text"
              placeholder="Answer 1"
              validateOnChange={false}
              validateOnBlur={false}
              validations={{
                required: true
              }}
              validationErrors={{
                required: "Please enter your answer1"
              }}
              value={answer1}
            />
            <FormInputField
              name="answer2"
              label="Answer 2"
              type="text"
              placeholder="Answer 2"
              validateOnChange={false}
              validateOnBlur={false}
              validations={{
                required: true
              }}
              validationErrors={{
                required: "Please enter your answer2"
              }}
              value={answer2}
            />
            <FormInputField
              name="answer3"
              label="Answer 3"
              type="text"
              placeholder="Answer 3"
              validateOnChange={false}
              validateOnBlur={false}
              validations={{
                required: true
              }}
              validationErrors={{
                required: "Please enter your answer3"
              }}
              value={answer3}
            />
            <FormInputField
              name="answer4"
              label="Answer 4"
              type="text"
              placeholder="Answer 4"
              validateOnChange={false}
              validateOnBlur={false}
              validations={{
                required: true
              }}
              validationErrors={{
                required: "Please enter your answer4"
              }}
              value={answer4}
            />
            <FormRadioGroupField
              name="correctAnswerNumber"
              label="Answers"
              required
              validations={{
                required(values, value) {
                  return value !== "";
                }
              }}
              validationErrors={{
                required: "Please choose answer."
              }}
              value={correctAnswerNumber}
            >
              <Radio value="1">Answers 1</Radio>
              <Radio value="2">Answers 2</Radio>
              <Radio value="3">Answers 3</Radio>
              <Radio value="4">Answers 4</Radio>
            </FormRadioGroupField>
            <Button htmlType="submit" className="submit-btn" type="primary" size="large" loading={isLoading}>
              Update Questions
            </Button>
          </Form>
        </Row>

        {!hasCategoryLoaded && <Loading />}
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

const WrappedForm = createForm()(addQuestion);

export default WrappedForm;
