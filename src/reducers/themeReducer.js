import { lightTheme, darkTheme } from '@constants/themes';

const initialState = {
	currentTheme: 'light', // ou 'dark', dependendo do padrão
	theme: lightTheme,
};

export const themeReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_THEME':
		return {
			...state,
			currentTheme: action.payload,
			theme: action.payload === 'dark' ? darkTheme : lightTheme,
		};
		default:
		return state;
	}
};
