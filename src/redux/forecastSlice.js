import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import weatherService from "../services/weatherService";

export const fetchForecast = createAsyncThunk(
    'forecast/fetchForecast',
    async (city, thunkAPI) => {
        try {
            const response = await weatherService.getForecast(city);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data){
                return thunkAPI.rejectWithValue(error.response.data);
            } else {
                return thunkAPI.rejectWithValue({ message: error.message });
            }
        }
    }
);

const forecastSlice = createSlice({
    name: 'forecast',
    initialState: {
        data: [],
        loading : false,
        error: null,
    },
    reducers: {
        clearForecast: (state) => {
            state.data = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchForecast.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchForecast.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.list;
            })
            .addCase(fetchForecast.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || 'Failed to fetch forecast';
            });
    },
});

export const { clearForecast } = forecastSlice.actions;
export default forecastSlice.reducer;