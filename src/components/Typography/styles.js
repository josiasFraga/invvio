import { StyleSheet } from 'react-native';

const styles = (theme, variant) => {
	const baseStyles = {
		text: {
			color: variant === 'caption' ? theme.colors.textSecondary : theme.colors.textPrimary,
			fontFamily: 'Lato-Regular',
		},
	};

	const variantStyles = {
		title: {
			fontSize: 20,
			fontWeight: '700',
		},
		subtitle: {
			fontSize: 18,
			fontWeight: '600',
		},
		breadcrumbTitle: {
			fontWeight: '800',
			fontSize: 16,
		},
		body: {
			fontSize: 14,
			fontWeight: '400',
		},
		caption: {
			fontSize: 12,
			fontWeight: '300',
		},
		headerTitle: {
			fontSize: 18,
			fontWeight: 'bold'
		}
	};

	return StyleSheet.create({
		textContainer: {
			//flex: 1,
			justifyContent: 'center',
		},
		text: {
			...baseStyles.text,
			...variantStyles[variant],
		},
	});
};

export default styles;
