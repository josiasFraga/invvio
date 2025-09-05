const INITIAL_STATE = {
  tabBarVisible: true,
  me: null,
  myBalance: 0,
  myBalanceLoading: false,
  transfers: [],
  transfersLoading: false,
  notifications: [],
  notificationsLoading: false,
  showBalance: true,
  notificationsNotReadCount: 0,
  notificationsNotReadCountLoading: false,
};

export const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_PERMISSION_GEOLOCATION':
		return {...state, permission_geolocation: action.payload};

    case 'GET_ME_SUCCESS':
        return {...state, me: action.payload};
    case 'GET_ME_FAILED':
        return {...state, me: null};

    case 'GET_MY_BALANCE':
        return {...state, myBalanceLoading: true};
    case 'GET_MY_BALANCE_SUCCESS':
        return {...state, myBalance: action.payload, myBalanceLoading: false};
    case 'GET_MY_BALANCE_FAILED':
        return {...state, myBalance: 0, myBalanceLoading: false};

    case 'GET_TRANSFERS':
        return {...state, transfersLoading: true};
    case 'GET_TRANSFERS_SUCCESS':{
			const newTransfers = [...state.transfers, ...action.payload];
			return {...state, transfers: newTransfers, transfersLoading: false};
        }
    case 'GET_TRANSFERS_FAILED':
        return {...state, transfers: [], transfersLoading: false};
    case 'RESET_TRANSFERS':
        return {...state, transfers: [], transfersLoading: false};

    case 'GET_NOTIFICATIONS_NOT_READ_COUNT':
        return {...state, notificationsNotReadCountLoading: true};
    case 'GET_NOTIFICATIONS_NOT_READ_COUNT_SUCCESS':
        return {...state, notificationsNotReadCount: action.payload, notificationsNotReadCountLoading: false};
    case 'GET_NOTIFICATIONS_NOT_READ_COUNT_FAILED':
        return {...state, notificationsNotReadCount: 0, notificationsNotReadCountLoading: false};

    case 'GET_NOTIFICATIONS':
        return {...state, notificationsLoading: true};
    case 'GET_NOTIFICATIONS_SUCCESS':{
            const newNotifications = [...state.notifications, ...action.payload];
            return {...state, notifications: newNotifications, notificationsLoading: false};
        }
    case 'GET_NOTIFICATIONS_FAILED':
        return {...state, notifications: [], notificationsLoading: false};
    case 'RESET_NOTIFICATIONS':
        return {...state, notifications: [], notificationsLoading: false};

    case 'TOGGLE_SHOW_BALANCE':
        return {...state, showBalance: !state.showBalance};

    case 'RESET_STATE':
    return INITIAL_STATE;

    default:
		return state;
  }
};
