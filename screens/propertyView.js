import * as Linking from 'expo-linking';
import { useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Appbar, Avatar, Card, Text, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
	Image,
	Platform,
	ScrollView,
	View,
	useWindowDimensions,
	Share
} from 'react-native';

const PropertyView = () => {
	const mapRef = useRef();
	const route = useRoute();
	const theme = useTheme();
	const markerRef = useRef();
	const navigation = useNavigation();
	const { width } = useWindowDimensions();
	const [propertyDetails] = useState(route.params?.propertyDetails);
	const appendHttps = propertyDetails?.images?.thumbs.length
		? propertyDetails?.images?.thumbs[0].split('//')[0] === 'https'
		: false;
	const coords = {
		longitude: propertyDetails?.mresult?.center[0],
		latitude: propertyDetails?.mresult?.center[1]
	};

	const getTitle = () => {
		return (
			<View style={{ width: '100%' }}>
				<Text variant='titleLarge'>${propertyDetails?.rent}</Text>
				<Text variant='bodyMedium' numberOfLines={1}>
					{propertyDetails?.location}
				</Text>
			</View>
		);
	};

	const handleOpenNativeMaps = () => {
		const url = Platform.select({
			ios: `maps://?q=${coords.latitude},${coords.longitude}`,
			android: `geo://?q=${coords.latitude},${coords.longitude}`
		});

		if (Platform.OS !== 'web') {
			Linking.openURL(url);
		}
	};

	const setMarkers = () => {
		setTimeout(() => {
			mapRef.current.fitToSuppliedMarkers([propertyDetails?._id]);

			setTimeout(() => {
				markerRef.current.showCallout();
			}, 1000);
		}, 1000);
	};

	const handleShareLink = () => {
		Share.share({
			message: `https://cirtru.com/listings/${propertyDetails?._id}`
		});
	};

	return (
		<>
			<Appbar.Header mode='small'>
				<Appbar.BackAction onPress={() => navigation.goBack()} />
				<Appbar.Content title={getTitle()} />
				<Appbar.Action icon='share-variant' onPress={handleShareLink} />
			</Appbar.Header>
			<ScrollView
				contentContainerStyle={{ flex: 1 }}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps='always'
			>
				{propertyDetails?.images?.thumbs.length ? (
					<Carousel
						loop
						width={width}
						height={width / 2}
						data={propertyDetails?.images?.thumbs}
						renderItem={({ item }) => (
							<Image
								source={{
									uri: appendHttps ? item : `https:${item}`
								}}
								resizeMode='cover'
								style={{
									width,
									height: width / 2
								}}
							/>
						)}
					/>
				) : (
					<View
						style={{
							backgroundColor: theme.colors.surfaceVariant,
							height: width / 2,
							width,
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
				<View style={{ padding: 16 }}>
					<Text variant='titleLarge'>${propertyDetails?.rent}</Text>
					<Text variant='titleMedium'>
						{propertyDetails?.location}
					</Text>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginVertical: 16
						}}
					>
						<Text variant='titleMedium'>
							Listed By {propertyDetails?.userName}
						</Text>
						<Avatar.Text
							size={32}
							label={propertyDetails?.userName.split('')[0]}
						/>
					</View>
				</View>
				<Card
					mode='outlined'
					style={{ marginHorizontal: 16, overflow: 'hidden' }}
				>
					<MapView
						ref={mapRef}
						loadingEnabled
						maxZoomLevel={15}
						showsCompass={false}
						toolbarEnabled={false}
						onMapReady={setMarkers}
						showsUserLocation={false}
						showsMyLocationButton={false}
						style={{ width: '100%', height: 300 }}
					>
						<Marker
							ref={markerRef}
							coordinate={coords}
							pinColor={theme.colors.primary}
							identifier={propertyDetails?._id}
							onCalloutPress={handleOpenNativeMaps}
							title={Platform.select({
								ios: 'Tap here to open in Maps',
								android: 'Tap here to open in Google Maps'
							})}
						/>
					</MapView>
				</Card>
			</ScrollView>
		</>
	);
};

export default PropertyView;
