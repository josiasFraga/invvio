import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from '@rneui/themed'; // Utilizando o hook do RNE
import styles from './styles';


const AppText = ({ children, style = {}, variant = 'body', ...props }) => {
	const { theme } = useTheme(); // Obtém o tema atual do RNE
	const themedStyles = styles(theme, variant); // Gera estilos dinâmicos

	return (
		<Text style={[themedStyles.text, style]} {...props}>
			{children}
		</Text>
	);
};

AppText.propTypes = {
	children: PropTypes.node,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	variant: PropTypes.oneOf(['title', 'subtitle', 'breadcrumbTitle', 'body', 'caption', 'headerTitle']),
};

export default AppText;
