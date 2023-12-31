import { store } from './store';
import { useEffect } from 'react';
import { AppNavigator } from './utils/navigation';
import { PaperProvider } from 'react-native-paper';
import { StatusBar, useColorScheme } from 'react-native';
import { setSettings } from './store/reducers/user.reducer';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CombinedDarkTheme, CombinedDefaultTheme } from './utils/theme';

const AppContainer = () => {
	const dispatch = useDispatch();
	const scheme = useColorScheme();
	const isDarkScheme = scheme === 'dark';
	const { settings } = useSelector(state => state.user);
	const theme = settings.isDark ? CombinedDarkTheme : CombinedDefaultTheme;

	useEffect(() => {
		StatusBar.setBarStyle(isDarkScheme ? 'light-content' : 'dark-content');
		dispatch(
			setSettings({
				...settings,
				isDark: isDarkScheme
			})
		);
	}, [isDarkScheme]);

	return (
		<>
			<PaperProvider theme={theme}>
				<NavigationContainer theme={theme}>
					<AppNavigator />
				</NavigationContainer>
			</PaperProvider>
		</>
	);
};

const App = () => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Provider store={store}>
				<AppContainer />
			</Provider>
		</GestureHandlerRootView>
	);
};

export default App;
