import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import weatherService from '../services/weatherService';

//fetch current weather
export const fetchCurrentWeather = createAsyncThunk(
    'weather/fetchCurrentWeather',
    async (city, thunkAPI) => {
        try {
            const response = await weatherService.getCurrentWeather(city);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        };
    }
)

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        current: null,
        loading: false,
        error: null,
    },
    reducers:{
        clearWeatherData: (state) => {
            state.current = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
          // Current Weather
          .addCase(fetchCurrentWeather.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
            state.loading = false;
            state.current = action.payload;
          })
          .addCase(fetchCurrentWeather.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message || 'Failed to fetch current weather';
          })
    },

});

export const { clearWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;