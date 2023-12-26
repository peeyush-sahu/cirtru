import { useEffect } from 'react';
import RoomList from '../components/roomList';
import HouseList from '../components/houseList';
import { Appbar, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useCityDataMutation } from '../store/services';
import { useNavigation } from '@react-navigation/native';
import PropertyLoader from '../components/propertyLoader';
import { setLocation } from '../store/reducers/common.reducer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const FindRental = () => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const { location } = useSelector(state => state.common);
	const [cityData, { isLoading }] = useCityDataMutation();

	useEffect(() => {
		if (location?.cityName) {
			const payload = {
				cityName: location?.cityName,
				stateName: location?.state
			};
			cityData(payload)
				.unwrap()
				.then(response => dispatch(setLocation(response)));
		}
	}, []);

	return (
		<>
			<Appbar.Header mode='small'>
				{navigation.canGoBack && (
					<Appbar.BackAction onPress={() => navigation.goBack()} />
				)}
				<Appbar.Content
					title={
						location?.mapbox_result?.place_name ||
						'Find Houses & Rooms'
					}
				/>
				<Appbar.Action
					icon='filter-remove-outline'
					onPress={() => {}}
				/>
			</Appbar.Header>
			{location?.mapbox_result ? (
				<Tab.Navigator
					screenOptions={({ route }) => ({
						lazy: true,
						swipeEnabled: false,
						tabBarPressColor: 'transparent',
						tabBarStyle: { backgroundColor: theme.colors.surface },
						tabBarLabelStyle: {
							fontWeight: '600',
							textTransform: 'capitalize'
						}
					})}
				>
					<Tab.Screen
						name='RoomList'
						options={{ title: 'Rooms' }}
						component={RoomList}
					/>
					<Tab.Screen
						name='HouseList'
						options={{ title: 'Houses' }}
						component={HouseList}
					/>
				</Tab.Navigator>
			) : isLoading ? (
				<>
					<PropertyLoader />
					<PropertyLoader />
				</>
			) : null}
		</>
	);
};

export default FindRental;
