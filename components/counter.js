import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

const Counter = () => {
	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center'
			}}
		>
			<IconButton
				size={12}
				icon='minus'
				mode='contained'
				onPress={() => console.log('Pressed')}
			/>
			<Text variant='labelLarge' style={{ marginHorizontal: 6 }}>
				1
			</Text>
			<IconButton
				size={12}
				icon='plus'
				mode='contained'
				onPress={() => console.log('Pressed')}
			/>
		</View>
	);
};

export default Counter;
