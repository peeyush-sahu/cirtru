import { Image, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

const NoData = ({ message, image, buttonText, onPress }) => {
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				paddingHorizontal: 16
			}}
		>
			<Image
				source={image}
				style={{ width: 200, height: 200, marginBottom: 36 }}
			/>
			{buttonText ? (
				<Button mode='contained' onPress={onPress}>
					{buttonText}
				</Button>
			) : (
				<Text variant='titleMedium' style={{ textAlign: 'center' }}>
					{message}
				</Text>
			)}
		</View>
	);
};

export default NoData;
