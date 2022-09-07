import defaultSettings from '../settings.json';
export interface GlobalState {
  settings?: typeof defaultSettings;
  userLoading?: boolean;
  collapsed?: boolean;
}

const initialState: GlobalState = {
  settings: defaultSettings,
  collapsed: false,
};

export default function store(state = initialState, action) {
  switch (action.type) {
    case 'update-settings': {
      const { settings } = action.payload;
      return {
        ...state,
        settings,
      };
    }
    // case 'update-userInfo': {
    //   const { userInfo = initialState.userInfo, userLoading } = action.payload;
    //   return {
    //     ...state,
    //     userLoading,
    //     userInfo,
    //   };
    // }
    case 'TOGGLE_COLLAPSED': {
      return {
        ...state,
        collapsed: action.payload
      }
    }
    default:
      return state;
  }
}
