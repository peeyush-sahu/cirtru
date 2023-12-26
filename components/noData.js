import { Image, View } from 'react-native';
import { Text } from 'react-native-paper';

const NoData = ({ message, image }) => {
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
			<Text variant='titleMedium' style={{ textAlign: 'center' }}>
				{message}
			</Text>
		</View>
	);
};

export default NoData;
