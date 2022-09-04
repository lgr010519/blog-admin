import {combineReducers} from "redux";
import global, {GlobalState} from './global'
import login, {UserLoginState} from "@/pages/login/redux/reducer";
import categories, {CategoriesState} from '@/pages/categories/redux/reducer'
import tags, {TagsState} from "@/pages/tags/redux/reducer";

export interface ReducerState {
    global: GlobalState
    login: UserLoginState
    categories: CategoriesState
    tags: TagsState
}

export default combineReducers({
    global,
    login,
    categories,
    tags,
})