import Home from '../screens/home';
import Login from '../screens/login';
import SignUp from '../screens/signUp';
import Account from '../screens/account';
import Settings from '../screens/settings';
import FindRental from '../screens/findRental';
import ListRental from '../screens/listRental';
import SearchCity from '../screens/searchCity';
import PropertyView from '../screens/propertyView';
import ForgotPassword from '../screens/forgotPassword';
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
					} else if (route.name === 'Settings') {
						iconName = focused ? 'cog' : 'cog-outline';
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
				options={{ title: 'Find' }}
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
				options={{ title: 'List' }}
				listeners={{
					tabPress: e => {
						e.preventDefault();
						navigation.navigate('ListProperty');
					}
				}}
			/>
			<Tab.Screen
				name='Account'
				component={Account}
				listeners={{
					tabPress: e => {
						e.preventDefault();
						navigation.navigate('Login');
					}
				}}
			/>
			<Tab.Screen name='Settings' component={Settings} />
		</Tab.Navigator>
	);
};

export const AppNavigator = () => {
	return (
		<AppStack.Navigator
			initialRouteName='Tabs'
			screenOptions={{ headerBackTitleVisible: false }}
		>
			<AppStack.Screen
				name='Login'
				component={Login}
				options={{ title: 'Sign In' }}
			/>
			<AppStack.Screen
				name='SignUp'
				component={SignUp}
				options={{ title: 'Finish signing up' }}
			/>
			<AppStack.Screen
				name='SearchCity'
				component={SearchCity}
				options={{ headerShown: false }}
			/>
			<AppStack.Screen
				name='PropertyView'
				component={PropertyView}
				options={{ title: 'Property Details' }}
			/>
			<AppStack.Screen
				name='ForgotPassword'
				component={ForgotPassword}
				options={{ title: 'Forgot Password' }}
			/>
			<AppStack.Screen
				name='Tabs'
				component={HomeTabs}
				options={{ headerShown: false }}
			/>
			<AppStack.Screen
				name='Listing'
				component={FindRental}
				options={{ title: 'Find Houses & Rooms' }}
			/>
			<AppStack.Screen
				name='ListProperty'
				component={ListRental}
				options={{ title: 'List your rental' }}
			/>
		</AppStack.Navigator>
	);
};
