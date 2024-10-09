import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import weatherService from "../services/weatherService";
import { fetchCurrentWeather } from "./weatherSlice";

export const fetchHomeCityWeather = createAsyncThunk(
    'homecity/fetchHomeCityWeather',
    async (city, thunkAPI) => {
        try {
            const response = await weatherService.getCurrentWeather(city);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        };
    }
)

const homeCitySlice = createSlice({
    name: 'homeCity',
    initialState: {
        data: null,
        loading: false,
        error: null,
        homeCityName: null,
    },
    reducers:{
        setHomeCity: (state, action) => {
            state.homeCityName = action.payload;
        },
        clearHomeCity: (state) => {
            state.data = null;
            state.loading = false;
            state.error = null;
            state.homeCityName = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHomeCityWeather.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHomeCityWeather.fulfilled, (state,action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchHomeCityWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || 'Failed to fetch current weather';
            })
    },
});

export const { setHomeCity, clearHomeCity } = homeCitySlice.actions;
export default homeCitySlice.reducer;