import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import DashboardReducer from "./dashboardReducer";
import UsersReducer from "./usersReducer";
import CategoryReducer from "./categoryReducer";
import QuestionReducer from "./questionReducer";
import BattleReducer from "./battleReducer";
import ShopReducer from "./shopReducer";

export default combineReducers({
	auth: AuthReducer,
	dashboard: DashboardReducer,
	users: UsersReducer,
	category: CategoryReducer,
	question: QuestionReducer,
	battle: BattleReducer,
	shop: ShopReducer
});
