import CityItem from '../components/cityItem';
import { Appbar, Searchbar, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { FlatList, ScrollView, View, useWindowDimensions } from 'react-native';

const Home = () => {
	const { width } = useWindowDimensions();
	const { topCities, location } = useSelector(state => state.common);
	const tempTopCities = [...topCities];
	let cityArray = [];
	while (tempTopCities.length > 0) cityArray.push(tempTopCities.splice(0, 2));

	const renderRow = (city, viewType) => {
		return (
			<View style={{ width: width / 2 - 16 }}>
				<CityItem city={city[0]} viewType={viewType} />
				{city.length > 1 ? (
					<CityItem city={city[1]} viewType={viewType} />
				) : null}
			</View>
		);
	};

	return (
		<>
			<Appbar.Header mode='small'>
				<Appbar.Content
					title={
						<Searchbar
							style={{ width: width - 32 }}
							placeholder={
								location?.mapbox_result?.place_name ||
								'Where are you moving?'
							}
						/>
					}
				/>
			</Appbar.Header>

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					alignItems: 'center',
					padding: 16
				}}
			>
				<Text variant='titleLarge' style={{ paddingTop: 24 }}>
					Get your rental rooms
				</Text>
				<Text variant='bodyMedium'>
					Find rooms in more than 10,000 cities in the USA
				</Text>
				<FlatList
					data={cityArray}
					horizontal={true}
					style={{ marginVertical: 24 }}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => renderRow(item, 'rooms')}
				/>
				<Text variant='titleLarge'>Get your rental houses</Text>
				<Text variant='bodyMedium'>
					Find houses in more than 10,000 cities in the USA
				</Text>
				<FlatList
					data={cityArray}
					horizontal={true}
					style={{ marginVertical: 24 }}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => renderRow(item, 'houses')}
				/>
			</ScrollView>
		</>
	);
};

export default Home;
