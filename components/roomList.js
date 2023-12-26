import NoData from './noData';
import { useCallback } from 'react';
import PropertyCard from './propertyCard';
import PropertyLoader from './propertyLoader';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { setRooms } from '../store/reducers/common.reducer';
import { usePropertiesListMutation } from '../store/services';
import { FlatList, InteractionManager } from 'react-native';

const RoomList = () => {
	const dispatch = useDispatch();
	const { location, rooms } = useSelector(state => state.common);
	const [getProperties, { isLoading }] = usePropertiesListMutation();

	const getRooms = () => {
		if (location?.mapbox_result) {
			let payload = {
				bufferPageCount: 0,
				isEntirePlace: false,
				lat: location?.mapbox_result?.center[1],
				lon: location?.mapbox_result?.center[0],
				mapbox_result: location?.mapbox_result,
				maxDist: 10,
				mixWithTp: null,
				pageNum: 1,
				perPage: 24,
				sort: 'featuredFirst'
			};

			getProperties(payload)
				.unwrap()
				.then(response => dispatch(setRooms(response)));
		}
	};

	useFocusEffect(
		useCallback(() => {
			const task = InteractionManager.runAfterInteractions(() => {
				getRooms();
			});

			return () => {
				task.cancel();
				dispatch(setRooms({ count: 0, data: [] }));
			};
		}, [location])
	);

	return isLoading ? (
		<>
			<PropertyLoader />
			<PropertyLoader />
		</>
	) : rooms.data.length ? (
		<FlatList
			data={rooms.data}
			initialNumToRender={4}
			maxToRenderPerBatch={4}
			keyExtractor={item => item?._id}
			showsVerticalScrollIndicator={false}
			renderItem={({ item }) => (
				<PropertyCard rowItem={item} propertyType='rooms' />
			)}
		/>
	) : (
		<NoData
			image={require('../assets/no-room.png')}
			message={`No Rooms for rent in ${location?.mapbox_result?.place_name}`}
		/>
	);
};

export default RoomList;
