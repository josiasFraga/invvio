import { StyleSheet } from 'react-native';
const globalStyles = (theme) => StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},

	//header
	header: {
		alignItems: 'center',
		flexDirection: 'row'
	},
	header_overlaid: {
		position: 'absolute',
		paddingTop: Platform.OS === 'ios' ? 45 : 50,
		left: 0,
		right: 0,
		top: 0,
		zIndex: 10
	},

	//spaces
	spaceExtraSmall: {
		width: '100%',
		height: 10,
		backgroundColor: 'transparent'
	},
	spaceSmall: {
		width: '100%',
		height: 15,
		backgroundColor: 'transparent'
	},
	spaceMedium: {
		width: '100%',
		height: 30,
		backgroundColor: 'transparent'
	},
	spaceBig: {
		width: '100%',
		height: 50,
		backgroundColor: 'transparent'
	},
	//forms
	formSection: {
		marginBottom: 15,
	},
	formSectionContained: {
		marginBottom: 15,
		backgroundColor: theme.colors.backgroundTerciary,
		padding: 15,
		elevation: 1,
		shadowColor: 'black',
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 1,
	},
	formDividerContainer: {
		marginVertical: 10,
	},
	formDividerText: {
		fontWeight: 'bold',
		fontSize: 16,
		paddingVertical: 5,
	},
	// Inputs
	label: {
		fontFamily: 'Lato-Bold',
		fontWeight: 'bold',
		fontSize: 15,
		color: theme.colors.textPrimary,
	},
	placeholder: {
		color: theme.colors.textSecondary,
		fontSize: 15,
	},
	inputContainer: {
		backgroundColor: theme.colors.backgroundTerciary,
		paddingHorizontal: 0,
		borderRadius: 10,
		overflow: 'hidden',
		flex: 1,
	},
	input: {
		color: theme.colors.textPrimary,
		backgroundColor: theme.colors.backgroundTerciary,
		paddingHorizontal: 10,
		fontSize: 16,
		borderRadius: 10,
		overflow: 'hidden',
	},
	inputInner: {
		margin: 0,
		padding: 0,
		lineHeight: 'auto',
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomColor: theme.colors.borderColor, 
		backgroundColor: theme.colors.backgroundTerciary, 
		borderBottomWidth: 1,
		borderRadius: theme.borderRadius.borderRadius,
		overflow: 'hidden',
	},
	inputLabel: {
		color: theme.colors.textSecondary,

	},
	fakeField: {
		backgroundColor: theme.colors.backgroundTerciary,
		paddingVertical: 10,
		paddingHorizontal: 15,
		marginBottom: 20,
		borderRadius: theme.borderRadius.borderRadius,
	},

	// Aligns
	textCenter: {
		textAlign: 'center',
	},

	//Switchs
	switchContainer: { 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'space-between', 
		padding: 10
	},
	switchContainerNoPaddingHorizontal: { 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'space-between', 
		paddingVertical: 10
	},
	switchLabel: {
		fontSize: 15,
		fontFamily: 'Lato-Bold',
		fontWeight: 'bold',
		flexWrap: 'wrap',
		flex: 1,
		paddingRight: 5,
	},


	// Pickers
    pickerSelectClient: {
        backgroundColor: theme.colors.backgroundTerciary,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginBottom: 15,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },


	// IMAGES
	imageShadow: {
		shadowColor: theme.colors.shadow,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 1,
		elevation: 1
	},
	

	// CARDS
	card: {
		borderRadius: theme.borderRadius.borderRadius,
		backgroundColor: theme.colors.backgroundTerciary,
		marginBottom: 15,
		shadowColor: theme.colors.shadow,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 1
	},
	cardDetailsContainer: {
		padding: 15,
	},
	cardImageContainer: {
		position: 'relative',
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
	},
	cardImage: {
		width: '100%',
		height: 170,
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
	},
	cardTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: theme.colors.textPrimary,
		marginBottom: 5,
	},
	cardSubtitle: {
		fontSize: 14,
		color: theme.colors.textSecondary,
		marginBottom: 5,
	},

	cardSmall: {
		borderRadius: 25,
		backgroundColor: theme.colors.backgroundSecondary,
		marginTop: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 1,
		elevation: 1,
		flexDirection: 'row',
		padding: 15

	},

	cardSmallContainer: {
		marginTop: 15,	
		paddingBottom: 10,
		backgroundColor: theme.colors.backgroundTerciary,
		padding: 15,
		borderRadius: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 1,
		elevation: 1,
	},

	pageTitle: {
		fontSize: 22,
		fontWeight: '700',
		color: theme.colors.textPrimary,
	},

	// Margens
	secureMargin: {
		paddingHorizontal: 15,
	},
	contentCenterAbsolutly: {
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
	// Messages
	errorValidation: {
		color: 'red',
		fontSize: 12,
		/*textAlign: 'right',*/
		textAlignVertical: 'center',
		paddingRight: 15,
	},
	colorErrorValidation: {
		color: 'red',
	},
	// Layout
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},

	// Segment
	segmentContainer: {
		flexDirection: 'row',
		backgroundColor: 'transparent'
	},
	segmentScrollview: {
		paddingLeft: 15,
		backgroundColor: theme.colors.backgroundSecondary,
		paddingVertical: 10
	},

	// Action Container
	actionContainer: {
        backgroundColor: theme.colors.backgroundTerciary,
        padding: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        elevation: 1,
		paddingBottom: 20,
    },


	//TabBar
	TabBar:{
		tabBar: {			
			flexDirection: 'row',
			backgroundColor: theme.colors.tabBarBackground,
			shadowColor: '#000',
			shadowOffset: { width: 0, height: -3 },
			shadowOpacity: 0.1,
			shadowRadius: 6,
			elevation: 5,
			paddingVertical: 10,
			paddingHorizontal: 5
		},
		tabButton: {			
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			paddingVertical: 5,
		},
		tabLabel: {
			fontSize: 10,
			color: theme.colors.tabBarLabel,
			marginTop: 8,
			fontWeight: '800',
		},
		tabLabelFocused: {
			color: theme.colors.tabBarLabelActive,
		},
		activeIndicator: {			
			position: 'absolute',
			height: 4,
			backgroundColor: theme.colors.tabBarLabelActive,
			top: 0,
			borderRadius: 2,
			left: 10,
		}
	},
});

export default globalStyles;