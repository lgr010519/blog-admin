import { PaginationProps } from '@arco-design/web-react';
import {
  TOGGLE_CONFIRM_LOADING,
  TOGGLE_VISIBLE,
  UPDATE_FORM_PARAMS,
  UPDATE_LIST,
  UPDATE_LOADING,
  UPDATE_PAGINATION,
} from '@/pages/categories/redux/actionTypes';

const initialState = {
  data: [],
  pagination: {
    current: 1,
    pageSize: 20,
    showTotal: true,
    sizeCanChange: true,
    pageSizeChangeResetCurrent: true,
  },
  loading: true,
  formParams: {},
  visible: false,
  confirmLoading: false,
};

interface FormParams {
  [key: string]: string;
}

export interface TagsState {
  data?: any[];
  pagination?: PaginationProps;
  formParams?: FormParams;
  loading?: boolean;
  visible?: boolean;
  confirmLoading?: boolean;
}

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_LIST: {
      const { data } = action.payload;
      return {
        ...state,
        data,
      };
    }
    case UPDATE_LOADING: {
      const { loading } = action.payload;
      return {
        ...state,
        loading,
      };
    }
    case UPDATE_PAGINATION: {
      const { pagination } = action.payload;
      return {
        ...state,
        pagination,
      };
    }
    case UPDATE_FORM_PARAMS: {
      const { params } = action.payload;
      return {
        ...state,
        formParams: params,
      };
    }
    case TOGGLE_VISIBLE: {
      const { visible } = action.payload;
      return {
        ...state,
        visible,
      };
    }
    case TOGGLE_CONFIRM_LOADING: {
      const { confirmLoading } = action.payload;
      return {
        ...state,
        confirmLoading,
      };
    }
    default:
      return state;
  }
}
