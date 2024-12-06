import {
  UPDATE_ARTICLE_NUM_BY_CATEGORIES,
  UPDATE_ARTICLE_NUM_BY_TAGS,
  UPDATE_USER_GROWTH_DATA,
} from '@/pages/home/redux/actionTypes';

const initialState = {
  userGrowthData: [],
  articleNumByCategories: [],
  articleNumByTags: [],
};

export interface HomeState {
  userGrowthData: Array<{
    date: string;
    userNum: number;
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
    case UPDATE_USER_GROWTH_DATA: {
      const { userGrowthData } = action.payload;
      return {
        ...state,
        userGrowthData,
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
