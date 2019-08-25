import * as type from "./type";
import axios from "../utils/requestConfig";
import { Notify } from "zent";

export const getCategories = (size = 10, page = 0) => dispatch => {
	dispatch({
		type: type.FETCH_BATTLES,
		payload: {
			isLoaded: true,
			row: 0,
			page: page,
			list: []
		}
	});
	axios
		.get("")
		.then(res => {
			dispatch({
				type: type.FETCH_BATTLES,
				payload: {
					isLoaded: false,
					row: res.data.meta.totalCount,
					page: page,
					list: res.data.data
				}
			});
		})
		.catch(err => {
			Notify.error(
				err.data !== null
					? err.data.error.errorDescription
					: "There has been an error processing your request",
				5000
			);
			dispatch({
				type: type.FETCH_BATTLES,
				payload: {
					isLoaded: false,
					row: 0,
					page: page,
					list: []
				}
			});
		});
};
