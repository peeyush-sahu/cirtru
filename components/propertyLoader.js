import React from 'react';
import { useTheme } from 'react-native-paper';
import { useWindowDimensions } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';

const PropertyLoader = () => {
	const theme = useTheme();
	const { width } = useWindowDimensions();

	return (
		<ContentLoader
			speed={1}
			width={width}
			height={300}
			viewBox={`0 0 ${width} 300`}
			backgroundColor={theme.colors.surfaceVariant}
			foregroundColor={theme.colors.onSurfaceVariant}
		>
			<Rect
				x='16'
				y='16'
				rx='12'
				ry='12'
				width={width - 32}
				height={width / 2}
			/>
			<Rect
				x='24'
				y={width / 2 + 24}
				rx='3'
				ry='3'
				width={width - 64}
				height={16}
			/>
			<Rect
				x='24'
				y={width / 2 + 48}
				rx='3'
				ry='3'
				width={width / 2}
				height={8}
			/>
			<Rect
				x='24'
				y={width / 2 + 64}
				rx='3'
				ry='3'
				width={width / 3}
				height={8}
			/>
		</ContentLoader>
	);
};

export default PropertyLoader;
