import {combineReducers} from "redux";
import global, {GlobalState} from './global'
import login, {UserLoginState} from "@/pages/login/redux/reducer";
import categories, {CategoriesState} from '@/pages/categories/redux/reducer'

export interface ReducerState {
    global: GlobalState
    login: UserLoginState
    categories: CategoriesState
}

export default combineReducers({
    global,
    login,
    categories,
})