import {
	MD3LightTheme,
	MD3DarkTheme,
	adaptNavigationTheme
} from 'react-native-paper';
import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native';

const darkTheme = {
	...MD3DarkTheme,
	colors: {
		primary: 'rgb(165, 200, 255)',
		onPrimary: 'rgb(0, 49, 95)',
		primaryContainer: 'rgb(0, 71, 134)',
		onPrimaryContainer: 'rgb(212, 227, 255)',
		secondary: 'rgb(255, 176, 201)',
		onSecondary: 'rgb(101, 0, 52)',
		secondaryContainer: 'rgb(142, 0, 76)',
		onSecondaryContainer: 'rgb(255, 217, 226)',
		tertiary: 'rgb(125, 222, 23)',
		onTertiary: 'rgb(26, 55, 0)',
		tertiaryContainer: 'rgb(40, 80, 0)',
		onTertiaryContainer: 'rgb(152, 252, 60)',
		error: 'rgb(255, 180, 171)',
		onError: 'rgb(105, 0, 5)',
		errorContainer: 'rgb(147, 0, 10)',
		onErrorContainer: 'rgb(255, 180, 171)',
		background: 'rgb(26, 28, 30)',
		onBackground: 'rgb(227, 226, 230)',
		surface: 'rgb(26, 28, 30)',
		onSurface: 'rgb(227, 226, 230)',
		surfaceVariant: 'rgb(67, 71, 78)',
		onSurfaceVariant: 'rgb(195, 198, 207)',
		outline: 'rgb(141, 145, 153)',
		outlineVariant: 'rgb(67, 71, 78)',
		shadow: 'rgb(0, 0, 0)',
		scrim: 'rgb(0, 0, 0)',
		inverseSurface: 'rgb(227, 226, 230)',
		inverseOnSurface: 'rgb(47, 48, 51)',
		inversePrimary: 'rgb(0, 95, 175)',
		elevation: {
			level0: 'transparent',
			level1: 'rgb(33, 37, 41)',
			level2: 'rgb(37, 42, 48)',
			level3: 'rgb(41, 47, 55)',
			level4: 'rgb(43, 49, 57)',
			level5: 'rgb(46, 52, 62)'
		},
		surfaceDisabled: 'rgba(227, 226, 230, 0.12)',
		onSurfaceDisabled: 'rgba(227, 226, 230, 0.38)',
		backdrop: 'rgba(45, 49, 56, 0.4)'
	}
};

const lightTheme = {
	...MD3LightTheme,
	colors: {
		primary: 'rgb(0, 95, 175)',
		onPrimary: 'rgb(255, 255, 255)',
		primaryContainer: 'rgb(212, 227, 255)',
		onPrimaryContainer: 'rgb(0, 28, 58)',
		secondary: 'rgb(185, 0, 101)',
		onSecondary: 'rgb(255, 255, 255)',
		secondaryContainer: 'rgb(255, 217, 226)',
		onSecondaryContainer: 'rgb(62, 0, 30)',
		tertiary: 'rgb(56, 107, 0)',
		onTertiary: 'rgb(255, 255, 255)',
		tertiaryContainer: 'rgb(152, 252, 60)',
		onTertiaryContainer: 'rgb(13, 32, 0)',
		error: 'rgb(186, 26, 26)',
		onError: 'rgb(255, 255, 255)',
		errorContainer: 'rgb(255, 218, 214)',
		onErrorContainer: 'rgb(65, 0, 2)',
		background: 'rgb(253, 252, 255)',
		onBackground: 'rgb(26, 28, 30)',
		surface: 'rgb(253, 252, 255)',
		onSurface: 'rgb(26, 28, 30)',
		surfaceVariant: 'rgb(224, 226, 236)',
		onSurfaceVariant: 'rgb(67, 71, 78)',
		outline: 'rgb(116, 119, 127)',
		outlineVariant: 'rgb(195, 198, 207)',
		shadow: 'rgb(0, 0, 0)',
		scrim: 'rgb(0, 0, 0)',
		inverseSurface: 'rgb(47, 48, 51)',
		inverseOnSurface: 'rgb(241, 240, 244)',
		inversePrimary: 'rgb(165, 200, 255)',
		elevation: {
			level0: 'transparent',
			level1: 'rgb(240, 244, 251)',
			level2: 'rgb(233, 239, 249)',
			level3: 'rgb(225, 235, 246)',
			level4: 'rgb(223, 233, 245)',
			level5: 'rgb(218, 230, 244)'
		},
		surfaceDisabled: 'rgba(26, 28, 30, 0.12)',
		onSurfaceDisabled: 'rgba(26, 28, 30, 0.38)',
		backdrop: 'rgba(45, 49, 56, 0.4)'
	}
};

const { LightTheme, DarkTheme } = adaptNavigationTheme({
	reactNavigationLight: NavigationDefaultTheme,
	reactNavigationDark: NavigationDarkTheme
});

export const CombinedDefaultTheme = {
	...LightTheme,
	...lightTheme,
	colors: {
		...LightTheme.colors,
		...lightTheme.colors
	}
};

export const CombinedDarkTheme = {
	...DarkTheme,
	...darkTheme,
	colors: {
		...DarkTheme.colors,
		...darkTheme.colors
	}
};
