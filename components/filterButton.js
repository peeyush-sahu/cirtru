import { View } from 'react-native';
import { Button, Surface, useTheme } from 'react-native-paper';

const FilterButton = ({ onFilterButtonPress }) => {
	const theme = useTheme();

	return (
		<Surface
			mode='flat'
			style={{
				height: 48,
				flexDirection: 'row',
				alignItems: 'center'
			}}
		>
			<Button
				icon='sort'
				style={{
					flex: 1
				}}
			>
				Sort
			</Button>
			<View
				style={{
					width: 1,
					height: 32,
					backgroundColor: theme.colors.surfaceVariant
				}}
			/>
			<Button
				icon='filter-variant'
				style={{ flex: 1 }}
				onPress={onFilterButtonPress}
			>
				Filter
			</Button>
		</Surface>
	);
};

export default FilterButton;
