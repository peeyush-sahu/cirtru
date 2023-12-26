import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const miscApi = createApi({
	reducerPath: 'misc',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://www.cirtru.com'
	}),
	endpoints: build => ({
		getLocations: build.query({
			query: text => ({
				url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?limit=5&access_token=pk.eyJ1IjoiY2lydHJ1IiwiYSI6ImNrcGtwczdncTAzcXgyb24yM290OGMxZXkifQ.v-wiEEXFtxmsBBajCeQaAQ&proximity=86.22599792480469%2C23.824399948120117`
			})
		})
	})
});

export const { useLazyGetLocationsQuery } = miscApi;
