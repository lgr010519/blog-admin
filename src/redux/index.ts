import {combineReducers} from "redux";
import global, {GlobalState} from './global'
import login, {UserLoginState} from "@/pages/login/redux/reducer";
import categories, {CategoriesState} from '@/pages/categories/redux/reducer'
import tags, {TagsState} from "@/pages/tags/redux/reducer";
import user, {UserState} from "@/pages/user/redux/reducer"
import comment, {CommentState} from "@/pages/comment/redux/reducer"
import recommend, {RecommendState} from "@/pages/site/right/components/redux/reducer"
import articles, {ArticlesState} from "@/pages/articles/redux/reducer"
import home, {HomeState} from "@/pages/home/redux/reducer"

export interface ReducerState {
    global: GlobalState
    login: UserLoginState
    categories: CategoriesState
    tags: TagsState
    user: UserState
    comment: CommentState
    recommend: RecommendState
    articles:ArticlesState
    home: HomeState
}

export default combineReducers({
    global,
    login,
    categories,
    tags,
    user,
    comment,
    recommend,
    articles,
    home,
})