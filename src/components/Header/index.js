import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@rneui/themed';

import BackButton from '@components/Buttons/BackButton';
import CONFIG from '@constants/configs';
import AppText from '@components/Typography/AppText';
import globalStyles from '@styles/globalStyles';

const Header = ({ backButton, iconColor, styles, titleStyle, titulo, rightElement, titleLeftComponent }) => {

	const { theme } = useTheme();
    const GlobalStyle = globalStyles(theme);

	return(
	<View
		style={[
			GlobalStyle.header,
			{
				backgroundColor: theme.colors.background,
				height: CONFIG.ORIGINAL_HEADER_HEIGHT_WITHOUT_STATUS_BAR,
			},
			styles,
		]}
	>
		{titleLeftComponent && 
		<View style={[GlobalStyle.row, {alignItems: 'center'}]}>
			<View style={[{ flex: 6, alignItems: 'center' }, GlobalStyle.row]}>
				{backButton && <BackButton backScene="pop" iconColor={iconColor} />}
				<View style={{ flex: 1 }}>
				{titleLeftComponent()}
				</View>
			</View>
			{rightElement && <View style={{ marginLeft: 10 }}>
				{rightElement && rightElement()}
			</View>}
		</View>
		}
		{!titleLeftComponent && 
		<View style={GlobalStyle.row}>
			<View>
				{backButton && <BackButton backScene="pop" iconColor={iconColor} />}
				{!backButton && <View style={{ width: 60 }} />}
			</View>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<AppText style={[GlobalStyle.pageTitle, titleStyle]}>{titulo}</AppText>
			</View>
			<View>
				{rightElement && rightElement()}
				{!rightElement && <View style={{ width: 50 }} />}
			</View>
		</View>
		}
	</View>
	)
};

export default Header;
