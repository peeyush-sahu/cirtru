import NoData from './noData';
import Filter from './filter';
import { useCallback } from 'react';
import PropertyCard from './propertyCard';
import FilterButton from './filterButton';
import PropertyLoader from './propertyLoader';
import { useModalize } from 'react-native-modalize';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, InteractionManager } from 'react-native';
import { setHouses } from '../store/reducers/common.reducer';
import { usePropertiesListMutation } from '../store/services';

const HouseList = () => {
	const dispatch = useDispatch();
	const { ref: sheetRef, open, close } = useModalize();
	const { location, houses } = useSelector(state => state.common);
	const [getProperties, { isLoading }] = usePropertiesListMutation();

	const getHouses = filters => {
		if (location?.mapbox_result) {
			let payload = {
				bufferPageCount: 0,
				isEntirePlace: true,
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
				.then(response => dispatch(setHouses(response)));
		}
	};

	useFocusEffect(
		useCallback(() => {
			const task = InteractionManager.runAfterInteractions(() => {
				getHouses();
			});

			return () => {
				task.cancel();
				dispatch(setHouses({ count: 0, data: [] }));
			};
		}, [location])
	);

	const handleFilterProperties = filters => {
		close();
		getHouses(filters);
	};

	return isLoading ? (
		<>
			<PropertyLoader />
			<PropertyLoader />
		</>
	) : houses.data.length ? (
		<>
			<FlatList
				data={houses.data}
				initialNumToRender={4}
				maxToRenderPerBatch={4}
				stickyHeaderIndices={[0]}
				keyExtractor={item => item?._id}
				ListHeaderComponent={<FilterButton />}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => (
					<PropertyCard rowItem={item} propertyType='houses' />
				)}
			/>
			<Filter ref={sheetRef} onApplyFilter={handleFilterProperties} />
		</>
	) : (
		<NoData
			image={require('../assets/no-house.png')}
			message={`No Houses for rent in ${location?.mapbox_result?.place_name}`}
		/>
	);
};

export default HouseList;
