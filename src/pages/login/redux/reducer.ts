import {LOGIN} from "@/pages/login/redux/actionTypes";

const initialState = {
    userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}')
}

export interface UserLoginState {
    userInfo?: {
        name?: string,
        avatar?: string
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN: {
            const userInfo = {
                ...action.payload,
                avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202101%2F23%2F20210123215342_3bbf3.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664706079&t=141de6443098089151fe70d0dbb94af8'
            }
            localStorage.setItem('userInfo',JSON.stringify(userInfo))
            return {
                ...state,
                ...userInfo
            }
        }
        default:
            return state
    }
}