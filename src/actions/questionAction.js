import * as type from "./type";
import axios from "../utils/requestConfig";
import { Notify } from "zent";

const getCategory = () => {
  return axios.get("/questioncategories");
};

const getQuestions = (size = 10, page = 0) => {
  return axios.get(`/questions?_pageSize=${size}&_pageNumber=${page}`);
};

export const getQuestionsWithCategory = (size = 10, page = 0) => dispatch => {
  dispatch({
    type: type.FETCH_QUESTIONS,
    payload: {
      isLoading: true,
      row: 0,
      page: page,
      list: [],
      categories: []
    }
  });
  Promise.all([getCategory(), getQuestions(size, page)])
    .then(res => {
      dispatch({
        type: type.FETCH_QUESTIONS,
        payload: {
          isLoading: false,
          row: res[1].data.meta.totalCount,
          page: page,
          list: res[1].data.data,
          categories: res[0].data.data
        }
      });
    })
    .catch(err => {
      Notify.error(err.data !== null && typeof err.data !== "undefined" ? err.data.error.errorDescription : "There has been an error processing your request", 5000);
      dispatch({
        type: type.FETCH_QUESTIONS,
        payload: {
          isLoading: false,
          row: 0,
          page: page,
          list: [],
          categories: []
        }
      });
    });
};
