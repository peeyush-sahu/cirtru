import dayjs from 'dayjs';
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native';
import { Image, View, useWindowDimensions } from 'react-native';
import { Text, Button, Card, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const PropertyCard = ({ rowItem, propertyType }) => {
	const theme = useTheme();
	let tempItem = { ...rowItem };
	const navigation = useNavigation();
	const { width } = useWindowDimensions();
	tempItem.start = tempItem.start.split('/').join('-');
	const tempDate = dayjs(tempItem?.start, 'MM-DD-YYYY');
	const appendHttps = tempItem?.images?.thumbs.length
		? tempItem?.images?.thumbs[0].split('//')[0] === 'https'
		: false;
	const availableText =
		propertyType === 'houses'
			? `${tempItem?.beds} Bed ${tempItem?.bath} Bath`
			: `${tempItem?.rooms_available_to_rent} Room(s)`;

	return (
		<Card
			mode='outlined'
			style={{ marginTop: 16, marginHorizontal: 16, overflow: 'hidden' }}
			onPress={() =>
				navigation.navigate('PropertyView', {
					propertyDetails: rowItem
				})
			}
		>
			{rowItem?.images?.thumbs.length ? (
				<Carousel
					loop
					width={width - 32}
					height={width / 2}
					data={rowItem?.images?.thumbs}
					renderItem={({ item }) => (
						<Image
							source={{
								uri: appendHttps ? item : `https:${item}`
							}}
							resizeMode='cover'
							style={{
								width: width - 32,
								height: width / 2,
								backgroundColor: theme.colors.surfaceVariant
							}}
						/>
					)}
				/>
			) : (
				<View
					style={{
						backgroundColor: theme.colors.surfaceVariant,
						height: width / 2,
						width: width - 32,
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<MaterialCommunityIcons
						name='home-city-outline'
						size={48}
						color='#888888'
					/>
				</View>
			)}
			<Card.Content style={{ paddingVertical: 8 }}>
				<Text variant='titleMedium' numberOfLines={2}>
					{tempItem?.street_address || 'Undisclosed'}
				</Text>
				<Text style={{ marginBottom: 8 }}>
					{tempItem?.primaryLocation}, {tempItem?.state}
				</Text>
				<Text>
					<Text variant='labelLarge'>${tempItem?.rent} </Text>.{' '}
					{availableText} . Available{' '}
					{tempDate.isBefore(dayjs())
						? 'now'
						: tempDate.format('DD MMM')}
				</Text>
			</Card.Content>
			<Card.Actions>
				<Button mode='contained' icon='email-outline'>
					Message
				</Button>
			</Card.Actions>
		</Card>
	);
};

export default PropertyCard;
