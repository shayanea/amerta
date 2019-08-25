import * as type from "../actions/type";

const initalState = {
	isLoading: false,
	data: []
};

export default function(state = initalState, action) {
	switch (action.type) {
		case type.FETCH_DASHBOARD:
			return {
				...state,
				isLoading: action.payload.isLoading,
				data: action.payload.data
			};
		default:
			return state;
	}
}
