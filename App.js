import { store } from './store';
import { Provider } from 'react-redux';
import { AppNavigator } from './utils/navigation';
import { PaperProvider } from 'react-native-paper';
import { CombinedDefaultTheme } from './utils/theme';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Provider store={store}>
				<PaperProvider theme={CombinedDefaultTheme}>
					<NavigationContainer theme={CombinedDefaultTheme}>
						<AppNavigator />
					</NavigationContainer>
				</PaperProvider>
			</Provider>
		</GestureHandlerRootView>
	);
};

export default App;
