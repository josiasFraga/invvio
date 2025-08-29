const INITIAL_STATE = {
  tabBarVisible: true,
  me: null,
};

export const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_PERMISSION_GEOLOCATION':
		return {...state, permission_geolocation: action.payload};

    case 'GET_ME_SUCCESS':
        return {...state, me: action.payload};
    case 'GET_ME_FAILED':
        return {...state, me: null};

    case 'RESET_STATE':
    return INITIAL_STATE;

    default:
		return state;
  }
};
