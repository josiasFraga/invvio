import {Dimensions, Platform, StatusBar} from 'react-native';

export default {
	dimensions: Dimensions.get('window'),
	platform: Platform.OS,

	url: 'http://192.168.1.21:3000/api',
    
	STATUSBAR_HEIGHT: Platform.OS === 'ios' ? 45 : StatusBar.currentHeight,
	ORIGINAL_HEADER_HEIGHT_WITHOUT_STATUS_BAR: 70
};
