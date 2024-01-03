import { Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, StyleSheet } from 'react-native';
import { setLocation } from '../store/reducers/common.reducer';

const CityItem = ({ city, viewType }) => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	return (
		<Pressable
			style={styles.cityContainer}
			onPress={() => {
				dispatch(
					setLocation({
						cityName: city?.cityName,
						state: city?.stateName
					})
				);
				navigation.navigate('Listing', { viewType });
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
	);
};

const styles = StyleSheet.create({
	cityContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 16,
		marginRight: 16
	},

	cityImage: {
		height: 72,
		width: 72,
		borderRadius: 12,
		marginRight: 8
	}
});

export default CityItem;
