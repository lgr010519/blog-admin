import { LOGIN } from '@/pages/login/redux/actionTypes';

const initialState = {
  userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
};

export interface UserLoginState {
  userInfo: {
    id: number;
    username: string;
    name: string;
    type: number;
    phone: string;
    avatarUrl: string;
    additionalInfo: string;
    status: number;
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      const userInfo = action.payload;

      return {
        ...state,
        ...userInfo,
      };
    }
    default:
      return state;
  }
}
