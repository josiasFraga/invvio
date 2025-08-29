import { Platform } from "react-native";
const isAndroid = Platform.OS === 'android';
import IMAGES from '@constants/images';
// Define light and dark themes for the application

const lightTheme = {
	colors: {
	  primary: '#1e0d30',
	  secondary: '#9388bc',
	  complementary: '#b95a55',
	  analogous1: '#6f61ff',
	  analogous2: '#b961ff',
	  triadic1: '#55b96f',
	  triadic2: '#b96f55',
	  background: '#f9fafb',
	  backgroundSecondary: '#fbfcfd',
	  backgroundTerciary: '#fff',
	  backgroundQuaternary: '#eaedf1',
	  tabBarBackground: '#f9fafb',
	  borderColor: '#cddcea',
	  textPrimary: '#333',
	  textSecondary: '#4574a1',
	  buttonBackground: '#1e0d30',
	  buttonText: '#f7f7f7',
	  secondaryButtonBackground: '#f7f7f7',
	  secondaryButtonText: '#333',
	  inativeButtonBackground: 'rgba(85, 78, 185, 0.1)',
	  inativeButtonText: '#1e0d30',
	  shadow: 'rgb(207, 207, 207)',
	  success: '#E7F8F1',
	  successText: '#1FA669',
	  warning: '#FFF9DB',
	  warningText: '#1FA669',
	  error: '#FDEBEC',
	  errorText: '#E54A2F',
	  info: '#E6F6FA',
	  infoText: '#1E88E5',
	  bubbleReceived: '#444',
	  bubbleSent: '#1e0d30',
	  skeletonBackground: '#e0e0e0', // Added for Skeleton
	  skeletonHighlight: '#f5f5f5',   // Highlight color for wave animation

	  tabBarLabel: '#6a8fb4',
	  tabBarLabelActive: '#1e0d30',
	},
	statusBarStyle: 'dark-content',
	images: {
		noImage: IMAGES.NO_IMAGE_LIGHT,
	},
	mode: 'light',
	borderRadius: {
		borderRadius: 10,
	},
	boxShadow: {
      elevation: 1,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      shadowColor: 'rgb(207, 207, 207)',
	},
	borderRadiusImage: {
		borderRadius: 10,
	},
	components: {
	  Skeleton: {
		style: {
		  backgroundColor: '#e0e0e0', // Light background for Skeleton
		},
		skeletonStyle: {
			backgroundColor: '#CCC',     // Highlight color for wave
		},
		animation: 'wave',             // Wave animation
		color: '#e0e0e0',              // Base color matching background
	  },
	  ListItem: {
		containerStyle: {
		  backgroundColor: '#FFF',
		  borderBottomColor: '#6a8fb4',
		},
	  },
	  ListItemTitle: {
		style: {
		  color: '#333',
		  fontWeight: 700,
		},
	  },
	  ListItemSubtitle: {
		style: {
		  color: '#777',
		},
	  },
	  ListItemCheckBox: {
		containerStyle: {
		  backgroundColor: '#FFF',
		},
	  },
	  CheckBox: {
		containerStyle: {
		  backgroundColor: '#FFF',
		  width: "100%",
		  margin: 0,
		  marginLeft: 0,
		  borderBottomWidth: 1,
		  borderBottomColor: '#6a8fb4',
		  paddingVertical: 13,
		},
		titleProps: {
			style: {
				fontFamily: 'Lato-Bold',
				color: '#333',
				fontWeight: 'bold',
				fontSize: 15,
			}

		}
	  }
	},
  };
  
  const darkTheme = {
	colors: {
	  primary: '#1e0d30',
	  secondary: '#462f8aff',
	  complementary: '#ff6f61',
	  analogous1: '#1e0d30',
	  analogous2: '#b961ff',
	  triadic1: '#55b96f',
	  triadic2: '#b96f55',
	  background: '#0f1a24',
	  backgroundSecondary: '#131e2a',
	  backgroundTerciary: '#172736',
	  backgroundQuaternary: '#172736',
	  tabBarBackground: '#172736',
	  borderColor: '#2e4e6b',
	  textPrimary: '#FFFFFF',
	  textSecondary: '#8daece',
	  buttonBackground: '#1e0d30',
	  buttonText: '#FFF',
	  secondaryButtonBackground: '#253646',
	  secondaryButtonText: '#f7f7f7',
	  inativeButtonBackground: 'rgba(85, 78, 185, 0.1)',
	  inativeButtonText: '#8daece',
	  shadow: 'RGB(23, 39, 54)',
	  success:     '#1FA66933', // verde claro com ~20% opacidade
	  successText: '#A1E9CC',   // verde-água suave

	  warning:     '#FFF4CC33', // amarelo pastel translúcido (~20%)
	  warningText: '#FFD666',   // amarelo-manteiga

	  error:       '#FDEBEC33', // rosa claro translúcido
	  errorText:   '#FFA8A0',   // rosa-avermelhado claro

	  info:        '#E6F6FA33', // azul claro translúcido
	  infoText:    '#66C1F2',   // azul bebê vibrante
	  bubbleReceived: '#172736',
	  bubbleSent: '#172736',
	  skeletonBackground: '#2c2c2c', // Added for Skeleton
	  skeletonHighlight: '#3c3c3c',   // Highlight color for wave animation

	  tabBarLabel: '#8daece',
	  tabBarLabelActive: '#FFF',
	},
	statusBarStyle: 'light-content',
	borderRadius: {
		borderRadius: 10,
	},
	boxShadow: {
      elevation: 1,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      shadowColor: 'RGB(23, 39, 54)',
	},
	borderRadiusImage: {
		borderRadius: 10,
	},
	mode: 'dark',
	images: {
		noImage: IMAGES.NO_IMAGE_DARK,
	},
	components: {
	  Skeleton: {
		style: {
		  backgroundColor: '#2c2c2c', // Dark background for Skeleton
		},
		skeletonStyle: {
			backgroundColor: '#3c3c3c',     // Highlight color for wave
		},
		animation: 'wave',             // Wave animation
		color: '#2c2c2c',              // Base color matching background
	  },
	  ListItem: {
		containerStyle: {
		  backgroundColor: '#172736',
		},
	  },
	  ListItemTitle: {
		style: {
		  color: '#FFF',
		  fontWeight: 700,
		},
	  },
	  ListItemSubtitle: {
		style: {
		  color: '#CCC',
		},
	  },
	  ListItemCheckBox: {
		containerStyle: {
		  backgroundColor: '#172736',
		},
	  },
	  CheckBox: {
		containerStyle: {
		  backgroundColor: '#252525',
		  width: "100%",
		  margin: 0,
		  marginLeft: 0,
		  borderBottomWidth: 1,
		  borderBottomColor: '#2e4e6b',
		  paddingVertical: 13,
		},
		titleProps: {
			style: {
				fontFamily: 'Lato-Bold',
				color: '#FFF',
				fontWeight: 'bold',
				fontSize: 15,
			}

		}
	  }
	},
};
  
export { lightTheme, darkTheme };
  