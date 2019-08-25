import * as type from "./type";
import axios from "../utils/requestConfig";
import { Notify } from "zent";

export const getUsers = (size = 10, page = 1) => dispatch => {
  dispatch({
    type: type.FETCH_USERS,
    payload: {
      isLoading: true,
      row: 0,
      page: page,
      list: []
    }
  });
  axios
    .get(`/accounts?_pageSize=${size}&_pageNumber=${page}`)
    .then(res => {
      dispatch({
        type: type.FETCH_USERS,
        payload: {
          isLoading: false,
          row: res.data.meta.totalCount,
          page: page,
          list: res.data.data
        }
      });
    })
    .catch(err => {
      Notify.error(err.data !== null && typeof err.data !== "undefined" ? err.data.error.errorDescription : "There has been an error processing your request", 5000);
      dispatch({
        type: type.FETCH_USERS,
        payload: {
          isLoading: false,
          row: 0,
          page: page,
          list: []
        }
      });
    });
};

export const getUsersInvitation = (size = 10, page = 1, id) => dispatch => {
  dispatch({
    type: type.FETCH_USERS_INVITATIONS,
    payload: {
      isLoading: true,
      row: 0,
      page: page,
      list: []
    }
  });
  axios
    .get(`/invitations?AccountId=${id}&_pageSize=${size}&_pageNumber=${page}`)
    .then(res => {
      dispatch({
        type: type.FETCH_USERS_INVITATIONS,
        payload: {
          isLoading: false,
          row: res.data.meta.totalCount,
          page: page,
          list: res.data.data
        }
      });
    })
    .catch(err => {
      Notify.error(err.data !== null && typeof err.data !== "undefined" ? err.data.error.errorDescription : "There has been an error processing your request", 5000);
      dispatch({
        type: type.FETCH_USERS_INVITATIONS,
        payload: {
          isLoading: false,
          row: 0,
          page: page,
          list: []
        }
      });
    });
};
