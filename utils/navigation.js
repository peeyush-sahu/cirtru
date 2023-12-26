import Home from '../screens/home';
import Account from '../screens/account';
import FindRental from '../screens/findRental';
import ListRental from '../screens/listRental';
import SearchCity from '../screens/searchCity';
import PropertyView from '../screens/propertyView';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

const AppStack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export const HomeTabs = () => {
	const navigation = useNavigation();

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'Home') {
						iconName = focused ? 'home' : 'home-outline';
					} else if (route.name === 'FindRental') {
						iconName = 'magnify';
					} else if (route.name === 'ListRental') {
						iconName = 'playlist-plus';
					} else if (route.name === 'Account') {
						iconName = focused ? 'account' : 'account-outline';
					}

					return (
						<MaterialCommunityIcons
							name={iconName}
							size={24}
							color={color}
						/>
					);
				}
			})}
		>
			<Tab.Screen name='Home' component={Home} />
			<Tab.Screen
				name='FindRental'
				component={FindRental}
				options={{ title: 'Find Rental' }}
				listeners={{
					tabPress: e => {
						e.preventDefault();
						navigation.navigate('Listing');
					}
				}}
			/>
			<Tab.Screen
				name='ListRental'
				component={ListRental}
				options={{ title: 'List Rental' }}
			/>
			<Tab.Screen name='Account' component={Account} />
		</Tab.Navigator>
	);
};

export const AppNavigator = () => {
	return (
		<AppStack.Navigator screenOptions={{ headerShown: false }}>
			<AppStack.Screen name='Tabs' component={HomeTabs} />
			<AppStack.Screen name='Listing' component={FindRental} />
			<AppStack.Screen name='SearchCity' component={SearchCity} />
			<AppStack.Screen name='PropertyView' component={PropertyView} />
		</AppStack.Navigator>
	);
};
