import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	rooms: { count: 0, data: [] },
	houses: { count: 0, data: [] },
	location: {
		cityName: '',
		state: ''
	},
	topCities: [
		{
			name: 'Atlanta',
			url: 'atlanta-ga',
			cityName: 'atlanta',
			stateName: 'georgia',
			img: 'https://static.cirtru.com/cirtru/webImgs/city_images/atlanta_square.jpg'
		},
		{
			name: 'Boston',
			url: 'boston-ma',
			cityName: 'boston',
			stateName: 'massachusetts',
			img: 'https://static.cirtru.com/cirtru/webImgs/city_images/boston_square.jpg'
		},
		{
			name: 'Chicago',
			url: 'chicago-il',
			cityName: 'chicago',
			stateName: 'illinois',
			img: 'https://static.cirtru.com/cirtru/webImgs/city_images/chicago_square.jpg'
		},
		{
			name: 'Dallas',
			url: 'dallas-tx',
			cityName: 'dallas',
			stateName: 'texas',
			img: 'https://static.cirtru.com/cirtru/webImgs/city_images/dallas_square.jpg'
		},
		{
			name: 'Las Vegas',
			url: 'las-vegas-nv',
			cityName: 'las vegas',
			stateName: 'nevada',
			img: 'https://static.cirtru.com/cirtru/webImgs/city_images/las_vegas_square.jpg'
		},
		{
			name: 'Los Angeles',
			url: 'los-angeles-ca',
			cityName: 'los angeles',
			stateName: 'california',
			img: 'https://static.cirtru.com/cirtru/webImgs/city_images/los_angeles_square.jpg'
		},
		{
			name: 'NYC',
			url: 'nyc-ny',
			cityName: 'nyc',
			stateName: 'new york',
			img: 'https://static.cirtru.com/cirtru/webImgs/city_images/new_york_city_square.jpg'
		},
		{
			name: 'San Diego',
			url: 'san-diego-ca',
			cityName: 'san diego',
			stateName: 'california',
			img: 'https://static.cirtru.com/cirtru/webImgs/city_images/san_diego_square.jpg'
		},
		{
			name: 'San Francisco',
			url: 'san-francisco-ca',
			cityName: 'san francisco',
			stateName: 'california',
			img: 'https://static.cirtru.com/cirtru/webImgs/city_images/san_francisco_square.jpg'
		},
		{
			name: 'San Jose',
			url: 'san-jose-ca',
			cityName: 'san jose',
			stateName: 'california',
			img: 'https://static.cirtru.com/cirtru/webImgs/city_images/san_jose_square.jpg'
		},
		{
			name: 'Seattle',
			url: 'seattle-wa',
			cityName: 'seattle',
			stateName: 'washington',
			img: 'https://static.cirtru.com/cirtru/webImgs/city_images/seattle_square.jpg'
		},
		{
			name: 'Washington DC',
			url: 'washington-dc',
			cityName: 'washington',
			stateName: 'dc',
			img: 'https://static.cirtru.com/cirtru/webImgs/city_images/washington_dc_square.jpg'
		}
	],
	filters: [
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
		{
			label: 'Smoking Ok',
			key: 'smoking',
			status: 'unchecked',
			type: 'rules'
		}
	]
};

const commonSlice = createSlice({
	name: 'common',
	initialState,
	reducers: {
		setLocation: (state, action) => {
			state.location = action.payload;
		},

		setRooms: (state, action) => {
			state.rooms = action.payload;
		},

		setHouses: (state, action) => {
			state.houses = action.payload;
		},

		setFilters: (state, action) => {
			state.filters = action.payload || initialFilters;
		}
	}
});

export default commonSlice.reducer;

export const { setLocation, setRooms, setHouses, setFilters } =
	commonSlice.actions;
