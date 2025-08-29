import React from 'react';
import {
	StyleSheet,
	SafeAreaView
} from 'react-native';
import { useTheme } from '@rneui/themed';

import SafeAreaViewAndroid from '@components/Misc/SafeAreaViewAndroid';

const CustomSafeAreaView = ({style}) => {
	const { theme } = useTheme();
	const themedStyles = styles(theme); 
	return (
	<>
		<SafeAreaView style={style ? style : themedStyles.safeAreaViewStyle} />
		<SafeAreaViewAndroid style={style ? style : themedStyles.safeAreaViewAndroidStyle} />
	</>
	);
};

const styles = (theme) => StyleSheet.create({
	safeAreaViewStyle: {
		backgroundColor: theme.colors.background,
	},
	safeAreaViewAndroidStyle: {
		backgroundColor: theme.colors.background,
	},
});

export default CustomSafeAreaView;
