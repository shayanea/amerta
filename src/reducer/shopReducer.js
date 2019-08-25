import * as type from "../actions/type";

const initalState = {
	list: [],
	row: 0,
	page: 1,
	isLoading: false
};

export default function(state = initalState, action) {
	switch (action.type) {
		case type.FETCH_SHOP_ITEMS:
			return {
				...state,
				row: action.payload.row,
				page: action.payload.page,
				list: action.payload.list,
				isLoading: action.payload.isLoading
			};
		default:
			return state;
	}
}
