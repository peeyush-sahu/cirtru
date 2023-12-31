import { Linking, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, IconButton, List, Switch } from 'react-native-paper';
import { setSettings } from '../store/reducers/user.reducer';

const Settings = () => {
	const dispatch = useDispatch();
	const { settings } = useSelector(state => state.user);

	const handleSwitchTheme = val => {
		StatusBar.setBarStyle(val ? 'light-content' : 'dark-content');
		dispatch(setSettings({ ...settings, isDark: val }));
	};

	return (
		<>
			<List.Section>
				<List.Item
					title='Dark Theme'
					description='Set light or dark theme'
					right={props => (
						<Switch
							{...props}
							value={settings.isDark}
							onValueChange={handleSwitchTheme}
						/>
					)}
					left={props => (
						<List.Icon {...props} icon='theme-light-dark' />
					)}
				/>
			</List.Section>
			<Divider />
			<List.Section>
				<List.Item
					title='Notifications'
					description='Allow app to send notifications'
					left={props => <List.Icon {...props} icon='bell-check' />}
					right={props => <Switch {...props} />}
				/>
			</List.Section>
			<Divider />
			<List.Section>
				<List.Item
					title='Terms of Use'
					description='Tap here to browse'
					left={props => <List.Icon {...props} icon='web-check' />}
					right={props => (
						<IconButton
							{...props}
							icon='chevron-right'
							onPress={() => console.log('Pressed')}
						/>
					)}
					onPress={() =>
						Linking.openURL('https://www.cirtru.com/terms')
					}
				/>
				<List.Item
					title='Privacy Policy'
					description='Tap here to browse'
					left={props => (
						<List.Icon {...props} icon='shield-check-outline' />
					)}
					right={props => (
						<IconButton
							{...props}
							icon='chevron-right'
							onPress={() => console.log('Pressed')}
						/>
					)}
					onPress={() =>
						Linking.openURL('https://www.cirtru.com/privacy')
					}
				/>
			</List.Section>
			<Divider />
			<List.Section>
				<List.Item
					title='App Version'
					description='1.0.0'
					left={props => (
						<List.Icon {...props} icon='application-braces' />
					)}
				/>
			</List.Section>
			<Divider />
			<List.Section>
				<List.Item
					title='Copyright'
					description='2023 Cirtru Classifieds, Inc. | United States'
					left={props => <List.Icon {...props} icon='copyright' />}
				/>
			</List.Section>
		</>
	);
};

export default Settings;
