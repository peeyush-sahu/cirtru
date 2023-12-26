import { store } from './store';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { AppNavigator } from './utils/navigation';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CombinedDarkTheme, CombinedDefaultTheme } from './utils/theme';

const App = () => {
	const scheme = useColorScheme();
	const theme = scheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<StatusBar style='auto' />
			<Provider store={store}>
				<PaperProvider theme={theme}>
					<NavigationContainer theme={theme}>
						<AppNavigator />
					</NavigationContainer>
				</PaperProvider>
			</Provider>
		</GestureHandlerRootView>
	);
};

export default App;
