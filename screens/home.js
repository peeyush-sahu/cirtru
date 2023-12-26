import { Text, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setLocation } from '../store/reducers/common.reducer';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';
import {
	Image,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	View
} from 'react-native';

const Home = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const { topCities, location } = useSelector(state => state.common);

	return (
		<View style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Animated.Text
					entering={FadeInLeft}
					style={{ textAlign: 'center' }}
				>
					<Text variant='titleMedium' style={{ textAlign: 'center' }}>
						Rent Smartly
					</Text>
				</Animated.Text>
				<Animated.Text
					entering={FadeInRight}
					style={{ textAlign: 'center' }}
				>
					<Text
						variant='headlineLarge'
						style={{ textAlign: 'center' }}
					>
						Houses & Rooms
					</Text>
				</Animated.Text>
				<Text
					variant='bodyLarge'
					style={{ marginTop: 8, textAlign: 'center' }}
				>
					Find rooms for rent in 10,000+ cities in USA
				</Text>
				<Button
					icon='magnify'
					mode='outlined'
					style={{ marginVertical: 24 }}
					onPress={() => navigation.navigate('SearchCity')}
				>
					{location?.mapbox_result?.place_name ||
						'Where are you moving?'}
				</Button>

				<View style={styles.citiesContainer}>
					{topCities.map((city, index) => (
						<Pressable
							key={index}
							style={styles.cityContainer}
							onPress={() => {
								dispatch(
									setLocation({
										cityName: city?.cityName,
										state: city?.stateName
									})
								);
								navigation.navigate('Listing');
							}}
						>
							<Image
								source={{ uri: city?.img }}
								style={styles.cityImage}
								resizeMode='cover'
							/>
							<Text
								variant='labelLarge'
								style={{ flex: 1 }}
								ellipsizeMode='tail'
								numberOfLines={1}
							>
								{city?.name}
							</Text>
						</Pressable>
					))}
				</View>
				<Button
					icon='home-search'
					mode='contained'
					style={{ marginVertical: 16 }}
					onPress={() => navigation.navigate('SearchCity')}
				>
					Start your search
				</Button>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === 'web' ? 16 : 56,
		paddingHorizontal: 16
	},

	citiesContainer: {
		marginVertical: 16,
		flexDirection: 'row',
		flexWrap: 'wrap'
	},

	cityContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '50%',
		marginBottom: 16
	},

	cityImage: {
		height: 72,
		width: 72,
		borderRadius: 12,
		marginRight: 8
	}
});

export default Home;
