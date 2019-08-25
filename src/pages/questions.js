import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getQuestionsWithCategory } from "../actions/questionAction";
import axios from "../utils/requestConfig";

import styled from "styled-components";
import { Layout, Table, Button, Icon, Breadcrumb, Sweetalert, Notify } from "zent";

const { Row } = Layout;

class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {
        pageSize: 10,
        current: this.props.question.page,
        totalItem: this.props.question.row
      },
      datasets: []
    };
  }

  static propTypes = {
    question: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
      page: PropTypes.number.isRequired
    })
  };

  componentDidMount() {
    this.props.getQuestionsWithCategory(10, 1);
  }

  componentDidUpdate(prevProps) {
    if (this.props.question.list.length && this.props.question.list !== prevProps.question.list) {
      this.setState({
        datasets: this.props.question.list
      });
    }
  }

  getCategoryById = array => {
    let result = null;
    array.forEach(item => {
      result = this.props.question.categories.find(el => el.id === item);
    });
    return result.title;
  };

  onChange(data) {
    this.props.getQuestionsWithCategory(10, data.pageSize);
  }

  questionDifficulty = type => {
    switch (type) {
      case 1:
        return "Easy";
      case 2:
        return "Normal";
      case 3:
        return "Hard";
      default:
        return "";
    }
  };

  removeQuestion = id => {
    Sweetalert.confirm({
      confirmType: "success",
      confirmText: "Yes",
      cancelText: "No",
      content: "Are you sure you want to delete this question ?",
      title: "Attention",
      className: "custom-sweetalert",
      maskClosable: true,
      parentComponent: this,
      onConfirm: () =>
        new Promise(resolve => {
          this.removeQuestionAction(id).then(res => {
            resolve();
          });
        })
    });
  };

  removeQuestionAction = id => {
    return axios
      .delete(`/questions/${id}`)
      .then(res => this.props.getQuestionsWithCategory(10, this.props.question.page))
      .catch(err => Notify.error(err.data !== null ? err.data.error.errorDescription : "There has been an error processing your request", 5000));
  };

  render() {
    const { isLoading } = this.props.question;
    const { datasets, page } = this.state;
    const columns = [
      {
        title: "Id",
        name: "id",
        width: "10%"
      },
      {
        title: "Category",
        name: "categoryIds",
        width: "15%",
        bodyRender: data => {
          return this.getCategoryById(data.categoryIds);
        }
      },
      {
        title: "Body",
        width: "30%",
        bodyRender: data => {
          return (
            <div className="text-limited">
              {data.body.substring(0, 30)} {data.body.length > 30 && "..."}
            </div>
          );
        }
      },
      {
        title: "Difficulty Level",
        width: "15%",
        bodyRender: data => {
          return this.questionDifficulty(data.difficulty);
        }
      },
      {
        title: "Correct Answer",
        name: "correctAnswerNumber",
        width: "15%"
      },
      {
        title: "Total Responses",
        width: "15%",
        bodyRender: data => {
          return 0;
        }
      },
      {
        title: "Total Correct Responses",
        width: "25%",
        bodyRender: data => {
          return 0;
        }
      },
      {
        title: "",
        width: "20%",
        bodyRender: data => {
          return (
            <ul>
              <li>
                <Link to={`/question/edit/${data.id}`} />
              </li>
              <li onClick={() => this.removeQuestion(data.id)} />
            </ul>
          );
        }
      }
    ];
    return (
      <div className="container">
        <Row>
          <Container>
            <Title>Questions</Title>
            <Breadcrumb breads={[{ name: "Dashboard", href: "/" }]} />
          </Container>
          <Button type="primary" style={{ float: "right" }} onClick={() => this.props.history.push("/question/add")}>
            <Icon type="plus" />
            New Question
          </Button>
        </Row>
        <Row>
          <Table
            emptyLabel={isLoading ? "loading" : "there is no question in database"}
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
  question: state.question
});

export default connect(
  mapStateToProps,
  { getQuestionsWithCategory }
)(QuestionList);
