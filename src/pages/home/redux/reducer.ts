import {
  UPDATE_ARTICLE_NUM_BY_CATEGORIES,
  UPDATE_ARTICLE_NUM_BY_TAGS,
  UPDATE_USER_NUM,
} from '@/pages/home/redux/actionTypes';

const initialState = {
  userNum: [],
  articleNumByCategories: [],
  articleNumByTags: [],
};

export interface HomeState {
  userNum: Array<{
    id: number;
    nickName: string;
    email: string;
    createTime: string;
  }>;
  articleNumByCategories: Array<{
    name: string;
    articleNum: number;
  }>;
  articleNumByTags: Array<{
    name: string;
    articleNum: number;
  }>;
}

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_NUM: {
      const { userNum } = action.payload;
      return {
        ...state,
        userNum,
      };
    }
    case UPDATE_ARTICLE_NUM_BY_CATEGORIES: {
      const { articleNumByCategories } = action.payload;
      return {
        ...state,
        articleNumByCategories,
      };
    }
    case UPDATE_ARTICLE_NUM_BY_TAGS: {
      const { articleNumByTags } = action.payload;
      return {
        ...state,
        articleNumByTags,
      };
    }
    default:
      return state;
  }
}
