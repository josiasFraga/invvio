import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef, processPendingNotifications } from '@services/NavigationService';
import CustomTabBar from '@components/CustomTabBar';

import CenaSplash from '@scenes/CenaSplash';
import CenaHome from '@scenes/CenaHome';
import CenaLogin from '@scenes/CenaLogin';
import CenaCadastro from '@scenes/CenaCadastro';
import CenaTabsHome from '@scenes/CenaTabsHome';
import CenaMenu from '@scenes/CenaMenu';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CenaTransferir from '../scenes/CenaTransferir';


const AppTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Routes(props){

  	const AppTabsScreenUser = () => {

		return (

			<AppTabs.Navigator
			initialRouteName="TabsHome"
			tabBar={props => <CustomTabBar {...props} />}
			screenOptions={{
				headerShown: false,
			}}>
				<AppTabs.Screen 
				name="TabsHome" 
				component={CenaTabsHome}
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: 'home'
				}}
				/>

				<AppTabs.Screen 
				name="Menu" 
				component={CenaMenu}
				options={{
					tabBarIcon: 'menu',
					tabBarType: 'feather'
				}}
				/>
			</AppTabs.Navigator>
		)
  
  	}

	return (
		<NavigationContainer
		ref={navigationRef}
		onReady={processPendingNotifications}
		>
		<Stack.Navigator
		screenOptions={{
		headerShown: false,
		}}
		>
			<Stack.Screen name="Splash" component={CenaSplash} />
			<Stack.Screen name="Login" component={CenaLogin} />
			<Stack.Screen name="Home" component={CenaHome} />
			<Stack.Screen name="Cadastro" component={CenaCadastro} />

			<Stack.Group screenOptions={{ animation: 'fade', headerShown: false }}>
			</Stack.Group>

			<Stack.Group screenOptions={{ presentation: 'modal', headerShown: false }}>
			</Stack.Group>

			<Stack.Screen
			name="Transferir"
			component={CenaTransferir}
			options={{ animation: 'slide_from_bottom', presentation: 'fullScreenModal' }}
			/>

			<Stack.Screen name="TabsScreenUser" component={AppTabsScreenUser} />
		</Stack.Navigator>
		</NavigationContainer>
	)
}
