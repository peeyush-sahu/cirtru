import * as Linking from 'expo-linking';
import { WebView } from 'react-native-webview';
import { useEffect, useRef, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar, Button, Text, Card, useTheme } from 'react-native-paper';
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

	const handleShareLink = () => {
		Share.share({
			message: `https://cirtru.com/listings/${propertyDetails?._id}`
		});
	};

	useEffect(() => {
		navigation.setOptions({
			headerTitle: propertyDetails?.location
		});
	}, []);

	const handleOpenNativeMaps = () => {
		const url = Platform.select({
			ios: `maps://?q=${coords.latitude},${coords.longitude}`,
			android: `geo://?q=${coords.latitude},${coords.longitude}`
		});

		if (Platform.OS !== 'web') {
			Linking.openURL(url);
		}
	};

	const mapHTML = ({ center }) =>
		`<!DOCTYPE html>
			<html>
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
				<link href="https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css" rel="stylesheet">
				<script src="https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.js"></script>
				<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.js"></script>
				<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.css" type="text/css">
				<style>
				body {
					margin: 0;
					padding: 0;
				}

				#map {
					position: absolute;
					top: 0;
					bottom: 0;
					width: 100%;
				}
				</style>
			</head>
			<body>
				<div id="map"></div>
				<script>
					mapboxgl.accessToken = "pk.eyJ1IjoiY2lydHJ1IiwiYSI6ImNrcGtwczdncTAzcXgyb24yM290OGMxZXkifQ.v-wiEEXFtxmsBBajCeQaAQ";
					const map = new mapboxgl.Map({
						container: 'map',
						center: [-71.0715, 42.3581],
						zoom: 13,
						style: 'mapbox://styles/mapbox/outdoors-v12'
					});
					const marker = new mapboxgl.Marker()
						.setLngLat([-71.0715, 42.3581])
						.addTo(map);
				</script>
			</body>
			</html>
`;

	return (
		<ScrollView
			scrollEnabled
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
				<Text variant='titleMedium'>{propertyDetails?.location}</Text>
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
				<Button
					mode='outlined'
					icon='share-variant'
					onPress={handleShareLink}
				>
					Share
				</Button>
			</View>
			<Card
				mode='outlined'
				style={{
					marginHorizontal: 16,

					overflow: 'hidden'
				}}
			>
				<WebView
					containerStyle={{
						flex: 0,
						height: 300
					}}
					startInLoadingState
					source={{
						html: mapHTML([coords.longitude, coords.latitude])
					}}
				/>
			</Card>
		</ScrollView>
	);
};

export default PropertyView;
