import { useState } from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

const Counter = () => {
	const [count, setCount] = useState(1);

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
				onPress={() => setCount(c => Math.max(c - 1, 1))}
			/>
			<Text variant='labelLarge' style={{ marginHorizontal: 6 }}>
				{count}
			</Text>
			<IconButton
				size={12}
				icon='plus'
				mode='contained'
				onPress={() => setCount(c => Math.max(c + 1, 1))}
			/>
		</View>
	);
};

export default Counter;
