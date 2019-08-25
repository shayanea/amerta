import * as type from "./type";
import axios from "../utils/requestConfig";
import { Notify } from "zent";

const getUsers = () => {
  return axios.get("/accounts?_pageSize=1&_pageNumber=1");
};

const getCategories = () => {
  return axios.get("/questioncategories?_pageSize=1&_pageNumber=1");
};

const getQuestions = () => {
  return axios.get("/questions?_pageSize=1&_pageNumber=1");
};

export const getDashboard = () => dispatch => {
  dispatch({
    type: type.FETCH_DASHBOARD,
    payload: {
      isLoading: true,
      data: null
    }
  });
  Promise.all([getUsers(), getCategories(), getQuestions()])
    .then(res => {
      dispatch({
        type: type.FETCH_DASHBOARD,
        payload: {
          isLoading: false,
          data: { usersCount: res[0].data.meta.totalCount, categoriesCount: res[1].data.meta.totalCount, questionsCount: res[2].data.meta.totalCount }
        }
      });
    })
    .catch(err => {
      Notify.error(err.data !== null && typeof err.data !== "undefined" ? err.data.error.errorDescription : "There has been an error processing your request", 5000);
      dispatch({
        type: type.FETCH_DASHBOARD,
        payload: {
          isLoading: false,
          data: null
        }
      });
    });
};
