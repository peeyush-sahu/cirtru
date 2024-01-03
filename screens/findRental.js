import { useEffect } from 'react';
import NoData from '../components/noData';
import RoomList from '../components/roomList';
import HouseList from '../components/houseList';
import { useDispatch, useSelector } from 'react-redux';
import { useCityDataMutation } from '../store/services';
import { useNavigation, useRoute } from '@react-navigation/native';
import PropertyLoader from '../components/propertyLoader';
import { setLocation } from '../store/reducers/common.reducer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const FindRental = () => {
	const route = useRoute();
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
				.then(response => {
					dispatch(setLocation(response));
					navigation.setOptions({
						title: `${response?.mapbox_result?.place_name}`
					});
				});
		}
	}, []);

	return (
		<>
			{location?.mapbox_result ? (
				<Tab.Navigator
					screenOptions={({ route }) => ({
						lazy: true,
						swipeEnabled: false,
						tabBarPressColor: 'transparent',
						tabBarLabelStyle: {
							fontWeight: '600',
							textTransform: 'capitalize'
						}
					})}
					initialRouteName={
						route.params?.viewType === 'rooms'
							? 'RoomList'
							: 'HouseList'
					}
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
			) : (
				<NoData
					buttonText={'Choose a City'}
					image={require('../assets/no-location.png')}
					onPress={() => navigation.navigate('SearchCity')}
				/>
			)}
		</>
	);
};

export default FindRental;
