import { forwardRef } from 'react';
import { Modalize } from 'react-native-modalize';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../store/reducers/common.reducer';
import { Button, Surface, Checkbox, Divider, Text } from 'react-native-paper';
import {
	SafeAreaView,
	useSafeAreaInsets
} from 'react-native-safe-area-context';

const initialFilters = [
	{
		label: 'Heating',
		key: 'heating',
		status: 'unchecked',
		type: 'amenities'
	},
	{
		label: 'Air Conditioning',
		key: 'ac',
		status: 'unchecked',
		type: 'amenities'
	},
	{
		label: 'Washer/Dryer',
		key: 'laundry',
		status: 'unchecked',
		type: 'amenities'
	},
	{ label: 'Cats Ok', key: 'cats', status: 'unchecked', type: 'rules' },
	{ label: 'Dogs Ok', key: 'dogs', status: 'unchecked', type: 'rules' },
	{ label: 'Smoking Ok', key: 'smoking', status: 'unchecked', type: 'rules' }
];

const Filter = forwardRef(({ onApplyFilter }, ref) => {
	const dispatch = useDispatch();
	const { bottom } = useSafeAreaInsets();
	const { filters } = useSelector(state => state.common);

	const handleChangeFilters = key => {
		const updatedFilter = filters.map(f =>
			f.key === key
				? {
						...f,
						status: f.status === 'checked' ? 'unchecked' : 'checked'
				  }
				: f
		);

		dispatch(setFilters(updatedFilter));
	};

	const handleResetFilters = () => {
		setFilters(initialFilters);
	};

	const handleApplyFilters = () => {
		const applied = filters.filter(f => f.status === 'checked');
		let propertyAmenities = applied
			.filter(f => f.type === 'amenities')
			.map(f => f.key)
			.join(',');

		let propertyRules = {};

		applied
			.filter(f => f.type === 'rules')
			.forEach(f => {
				propertyRules[f.key] = 'true';
			});

		if (propertyAmenities.length) {
			onApplyFilter({ propertyAmenities, ...propertyRules });
		} else {
			onApplyFilter(propertyRules);
		}
	};

	return (
		<>
			<Modalize
				ref={ref}
				withHandle={false}
				modalTopOffset={200}
				adjustToContentHeight
				closeOnOverlayTap={false}
				panGestureEnabled={false}
				HeaderComponent={
					<Surface
						mode='flat'
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							height: 56
						}}
					>
						<Text
							variant='titleLarge'
							style={{ flex: 1, marginHorizontal: 16 }}
						>
							Filters
						</Text>
						<Button
							icon='close-circle'
							onPress={() => ref.current?.close()}
						/>
					</Surface>
				}
				FooterComponent={
					<Surface
						mode='flat'
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							paddingVertical: 16,
							paddingHorizontal: 16,
							paddingBottom: bottom + 16
						}}
					>
						<Button onPress={handleResetFilters}>Reset</Button>
						<Button mode='contained' onPress={handleApplyFilters}>
							Apply
						</Button>
					</Surface>
				}
			>
				<>
					<Divider />
					<Surface>
						<Text
							variant='titleMedium'
							style={{ marginHorizontal: 16, marginTop: 16 }}
						>
							Amenities
						</Text>
						{filters
							.filter(f => f.type === 'amenities')
							.map(a => (
								<Checkbox.Item
									key={a.key}
									mode='android'
									label={a.label}
									status={a.status}
									onPress={() => handleChangeFilters(a.key)}
								/>
							))}
						<Text
							variant='titleMedium'
							style={{ marginHorizontal: 16, marginTop: 16 }}
						>
							House Rules
						</Text>
						{filters
							.filter(f => f.type === 'rules')
							.map(a => (
								<Checkbox.Item
									key={a.key}
									mode='android'
									label={a.label}
									status={a.status}
									onPress={() => handleChangeFilters(a.key)}
								/>
							))}
						<SafeAreaView />
					</Surface>
				</>
			</Modalize>
		</>
	);
});

export default Filter;
