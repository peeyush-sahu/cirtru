import NoData from './noData';
import Filter from './filter';
import { useCallback } from 'react';
import PropertyCard from './propertyCard';
import FilterButton from './filterButton';
import PropertyLoader from './propertyLoader';
import { useModalize } from 'react-native-modalize';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { setRooms } from '../store/reducers/common.reducer';
import { FlatList, InteractionManager } from 'react-native';
import { usePropertiesListMutation } from '../store/services';

const RoomList = () => {
	const dispatch = useDispatch();
	const { ref: sheetRef, open, close } = useModalize();
	const { location, rooms } = useSelector(state => state.common);
	const [getProperties, { isLoading }] = usePropertiesListMutation();

	const getRooms = filters => {
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
				sort: 'featuredFirst',
				...filters
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

	const handleFilterProperties = filters => {
		close();
		getRooms(filters);
	};

	return isLoading ? (
		<>
			<PropertyLoader />
			<PropertyLoader />
		</>
	) : rooms.data.length ? (
		<>
			<FlatList
				data={rooms.data}
				initialNumToRender={4}
				maxToRenderPerBatch={4}
				stickyHeaderIndices={[0]}
				keyExtractor={item => item?._id}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={
					<FilterButton onFilterButtonPress={() => open()} />
				}
				renderItem={({ item }) => (
					<PropertyCard rowItem={item} propertyType='rooms' />
				)}
			/>
			<Filter ref={sheetRef} onApplyFilter={handleFilterProperties} />
		</>
	) : (
		<NoData
			image={require('../assets/no-room.png')}
			message={`No Rooms for rent in ${location?.mapbox_result?.place_name}`}
		/>
	);
};

export default RoomList;
