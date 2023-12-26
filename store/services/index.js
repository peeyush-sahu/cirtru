import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://www.cirtru.com'
	}),

	endpoints: build => ({
		cityData: build.mutation({
			query: body => ({
				body,
				method: 'POST',
				url: `/static_city_db/cityData`
			})
		}),

		propertiesList: build.mutation({
			query: body => ({
				body,
				method: 'POST',
				url: `/api/v1/roommates/list`
			})
		}),

		propertyDetails: build.query({
			query: id => ({ url: `/api/v1/listings/${id}` })
		})
	})
});

export const {
	useCityDataMutation,
	usePropertiesListMutation,
	useLazyPropertyDetailsQuery
} = api;
