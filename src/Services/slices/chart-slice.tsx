import { createSlice } from "@reduxjs/toolkit";

const chartSlice = createSlice({
    name: 'chart',
    initialState: {
        data: [], // service returned data
        countries: [],
        camps: [],
        schools: [],
        selectedCountry: {value: '', label: ''},
        selectedCamp: {value: '', label: ''},
        selectedSchool: {value: '', label: ''},
        lessons: [], // lessons array
        totalNumberOfLessons: 0, 
        filteredLessons: [],
        aggregatedLessons: [], // data grouped by school name
        chartHiddenSchools: [], // hiden schools array from chart
        serviceError: false
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        setCountries: (state, action) => {
            state.countries = action.payload.countries;
        },
        setCamps: (state, action) => {
            state.camps = action.payload.camps;
        },
        setSchools: (state, action) => {
            state.schools = action.payload.schools;
        },
        setLessons: (state, action) => {
            state.lessons = action.payload.lessons;
        },
        setSelectedCountry: (state, action) => {
            state.selectedCountry = action.payload
        },
        setSelectedCamp: (state, action) => {
            state.selectedCamp = action.payload
        },
        setSelectedSchool: (state, action) => {
            state.selectedSchool = action.payload
        },
        setTotalNumberOfLessons: (state, action) => {
            state.totalNumberOfLessons = action.payload
        },
        setFilteredLessons: (state, action) => {
            state.filteredLessons = action.payload
        },
        setAggregatedLessons: (state, action) =>{
            state.aggregatedLessons = action.payload;
        },
        setChartHiddenSchools: (state, action) =>{
            state.chartHiddenSchools = action.payload;
        },
        setServiceError: (state, action) =>{
            state.serviceError = action.payload;
        }
    }
});

export const chartActions = chartSlice.actions;
export default chartSlice;