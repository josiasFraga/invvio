import { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import { Icon, useTheme } from '@rneui/themed';
import AppText from '@components/Typography/AppText';
import globalStyles from '@styles/globalStyles';

const NoItems = ({ 
	message = "Nenhum item encontrado", 
	submessage = "",
	actionText = "Tentar Novamente", 
	onActionPress,
	style = {},
	type = "default" // 'default' ou 'compact'
}) => {
	// Utiliza useRef para manter os valores animados persistentes
	const scaleAnim = useRef(new Animated.Value(0.8)).current;
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const { theme } = useTheme();
	const GlobalStyle = globalStyles(theme);
	const themedStyles = styles(theme); 

	// Efeito de animação ao montar o componente
	useEffect(() => {
		// Resetar os valores animados para os estados iniciais
		scaleAnim.setValue(0.8);
		fadeAnim.setValue(0);
		
		// Iniciar a animação paralela
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 600,
				easing: Easing.out(Easing.exp),
				useNativeDriver: true,
			}),
			Animated.spring(scaleAnim, {
				toValue: 1,
				friction: 4,
				tension: 100,
				useNativeDriver: true,
			}),
		]).start();
	}, [scaleAnim, fadeAnim]); // Dependências fixas, pois useRef garante estabilidade


	if ( type === "compact" ) {
		return (
		<View style={[themedStyles.containerCompact, style]}>
			<Animated.View style={[themedStyles.contentCompact, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>

				<View style={GlobalStyle.row}>
					{/* Ícone */}
					<View style={[themedStyles.iconContainerCompact, { marginRight: 15}]}>
						<Icon
							name="inbox"
							type="feather"
							size={40}
							color={theme.colors.primary}
						/>
					</View>

					<View style={{flex: 1, mmarginLeft: 10}}>
						{/* Mensagem */}
						<AppText style={{marginBottom: 0, fontWeight: 'bold', fontSize: 16}}>{message}</AppText>
						{/* SubMensagem */}
						{submessage !== '' && <AppText style={{ color: theme.colors.textSecondary}}>{submessage}</AppText>}

						<View>
							{/* Botão de Ação */}
							{onActionPress && (
								<TouchableOpacity style={themedStyles.actionButton} onPress={onActionPress}>
									<AppText style={themedStyles.actionButtonText}>{actionText}</AppText>
								</TouchableOpacity>
							)}
						</View>

					</View>

				</View>
			</Animated.View>
		</View>
		);

	}

	return (
		<View style={[themedStyles.container, style]}>
			<Animated.View style={[themedStyles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
				{/* Ícone Central */}
				<View style={themedStyles.iconContainer}>
					<Icon
						name="inbox"
						type="feather"
						size={80}
						color={theme.colors.primary}
					/>
				</View>

				{/* Mensagem */}
				<AppText style={themedStyles.message}>{message}</AppText>

				{/* SubMensagem */}
				{submessage !== '' && <AppText style={themedStyles.submessage}>{submessage}</AppText>}

				{/* Linha Decorativa */}
				<View style={themedStyles.line} />

				{/* Botão de Ação */}
				{onActionPress && (
					<TouchableOpacity style={themedStyles.actionButton} onPress={onActionPress}>
						<AppText style={themedStyles.actionButtonText}>{actionText}</AppText>
					</TouchableOpacity>
				)}
			</Animated.View>
		</View>
	);
};

const styles = (theme) => StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: theme.colors.background, // Fundo claro
	},
	content: {
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 30,
		borderRadius: 15
	},
	iconContainer: {
		backgroundColor: theme.colors.background,
		borderRadius: 80,
		padding: 20,
		marginBottom: 20,
		elevation: 1,
	},
	message: {
		fontSize: 18,
		fontWeight: '600',
		textAlign: 'center',
		marginBottom: 10,
		lineHeight: 24,
	},
	submessage: {
		marginTop: 10,
		lineHeight: 18,
		textAlign: 'center',
	},
	line: {
		width: 60,
		height: 3,
		backgroundColor: theme.colors.primary, // Azul moderno
		borderRadius: 2,
		marginVertical: 10,
	},
	actionButton: {
		marginTop: 10,
		backgroundColor: theme.colors.primary,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8,
		shadowColor: '#4A90E2',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 1,
		elevation: 1,
	},
	actionButtonText: {
		fontSize: 16,
		fontWeight: '800',
		color: '#FFF',
		textAlign: 'center',
	},

	containerCompact: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: theme.colors.backgroundTerciary, // Fundo claro
		borderRadius: theme.borderRadius.borderRadius,
	},
	contentCompact: {
		alignItems: 'center',
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 15
	},
	iconContainerCompact: {
		backgroundColor: theme.colors.background,
		borderRadius: 80,
		padding: 10,
		elevation: 1,
	},
});

export default NoItems;
