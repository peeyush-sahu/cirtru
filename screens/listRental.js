import { useState } from 'react';
import { ScrollView } from 'react-native';
import Counter from '../components/counter';
import * as ImagePicker from 'expo-image-picker';
import { listOfAmeneties } from '../utils/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, List, Searchbar, Switch, Text } from 'react-native-paper';

const ListRental = () => {
	const [images, setImages] = useState(null);

	const handleSelectImages = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			quality: 1,
			allowsMultipleSelection: true,
			mediaTypes: ImagePicker.MediaTypeOptions.Images
		});

		console.log(result);
	};

	return (
		<ScrollView keyboardShouldPersistTaps='always' style={{ flex: 1 }}>
			<List.Section>
				<List.Subheader>Where's your place located?</List.Subheader>
				<Searchbar
					placeholder='e.g. 123 Main Street'
					style={{ marginHorizontal: 16, marginBottom: 12 }}
				/>
			</List.Section>
			<Divider />
			<List.Section>
				<List.Subheader>What are you listing?</List.Subheader>
				<List.Item
					title='Room'
					description='Private or shared rooms'
					right={props => <Switch {...props} />}
					left={props => <List.Icon {...props} icon='sofa-single' />}
				/>
				<List.Item
					title='Entire place'
					right={props => <Switch {...props} />}
					description='A whole house, apartment or studio'
					left={props => <List.Icon {...props} icon='home-city' />}
				/>
			</List.Section>
			<Divider />
			<List.Section>
				<List.Subheader>Property has</List.Subheader>
				<List.Item
					title='Living Room'
					right={props => <Switch {...props} />}
					left={props => <List.Icon {...props} icon='floor-lamp' />}
				/>
				<List.Item
					title='Total Bedrooms'
					left={props => <List.Icon {...props} icon='bed-king' />}
					right={props => <Counter {...props} />}
				/>
				<List.Item
					title='Total Bathrooms'
					left={props => <List.Icon {...props} icon='toilet' />}
					right={props => <Counter {...props} />}
				/>
			</List.Section>
			<List.Section>
				<List.Subheader>Amenities</List.Subheader>
				{listOfAmeneties.map(a => (
					<List.Item
						key={a.key}
						title={a.label}
						right={props => <Switch {...props} />}
						left={props => <List.Icon {...props} icon={a.icon} />}
					/>
				))}
			</List.Section>
			<Divider />
			<List.Section>
				<List.Subheader>Rules</List.Subheader>
				<List.Item
					title='Smoking Allowed'
					right={props => <Switch {...props} />}
					left={props => <List.Icon {...props} icon='smoking' />}
				/>
				<List.Item
					title='Cats Allowed'
					left={props => <List.Icon {...props} icon='cat' />}
					right={props => <Switch {...props} />}
				/>
				<List.Item
					title='Dogs Allowed'
					left={props => <List.Icon {...props} icon='dog' />}
					right={props => <Switch {...props} />}
				/>
				<List.Item
					title='Minimum stay in months'
					left={props => (
						<List.Icon {...props} icon='calendar-lock' />
					)}
					right={props => <Counter {...props} />}
				/>
			</List.Section>
			<Divider />
			<List.Section>
				<List.Subheader>Property Photos</List.Subheader>
				<List.Item
					left={props => <List.Icon {...props} icon='image-area' />}
					title='Upload Best Photos'
					description='You can upload multiple photos.'
					right={props => (
						<List.Icon {...props} icon='chevron-right' />
					)}
					onPress={handleSelectImages}
				/>
			</List.Section>
			<Divider />
			<List.Section>
				<List.Subheader>Property Description</List.Subheader>
				<Text variant='labelMedium' style={{ marginHorizontal: 16 }}>
					Once your listing is published and active, you would be able
					add more details.
				</Text>
			</List.Section>
			<SafeAreaView />
		</ScrollView>
	);
};

export default ListRental;
