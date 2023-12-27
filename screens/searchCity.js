import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDebounce } from '../utils/hooks';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Appbar, List, Searchbar } from 'react-native-paper';
import { useLazyGetLocationsQuery } from '../store/services/misc';
import { setLocation } from '../store/reducers/common.reducer';

const SearchCity = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const [query, setQuery] = useState('');
	const [search, { isLoading, data }] = useLazyGetLocationsQuery();

	const handleSearchLocation = useDebounce(text => {
		if (text && text.trim().length > 2) {
			search(text);
		}
	}, 500);

	useEffect(() => {
		handleSearchLocation(query);
	}, [query]);

	const handleShowProperties = item => {
		const place = item?.place_name.split(',');
		dispatch(
			setLocation({
				cityName: place[0],
				state: place[1].trim(),
				mapbox_result: item
			})
		);
		navigation.navigate('Listing');
	};

	return (
		<View style={{ flex: 1 }}>
			<Appbar.Header mode='small'>
				<Appbar.Content
					title={
						<Searchbar
							autoFocus
							value={query}
							loading={isLoading}
							onChangeText={setQuery}
							style={{ width: '100%' }}
							placeholder='Where are you moving?'
						/>
					}
				/>
				<Appbar.Action
					icon='close-circle'
					onPress={() => navigation.goBack()}
				/>
			</Appbar.Header>
			<ScrollView
				keyboardShouldPersistTaps='always'
				contentContainerStyle={{ flex: 1 }}
				showsVerticalScrollIndicator={false}
			>
				{data?.features?.length
					? data?.features?.map(item => (
							<List.Item
								key={item.id}
								title={item?.text}
								style={{ marginHorizontal: 16 }}
								onPress={() => handleShowProperties(item)}
								description={item?.context
									.map(d => d.text)
									.join(', ')}
							/>
					  ))
					: null}
			</ScrollView>
		</View>
	);
};

export default SearchCity;
