import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../utils/axios'

export const fetchRoutes = createAsyncThunk('routes/fetchRoutes', async () => {
   const { data } = await axios.get('/routes');
   return data;
})
export const fetchById = createAsyncThunk('routes/fetchById', async (id) => {
   const { data } = await axios.get(`/routes/${id}`);
   return data;
})
export const createRoute = createAsyncThunk('routes/createRoute', async (params) => {
   const { data } = await axios.post('/routes', params);
   return data;
})
export const deleteRoute = createAsyncThunk('routes/deleteRoute', async (id) => {
   const { data } = await axios.delete(`/routes/${id}`);
   return data;
})
export const editRoute = createAsyncThunk('routes/editRoute', async (params) => {
   const { data } = await axios.patch(`/routes`, params);
   return data;
})
export const createNext = createAsyncThunk('/routes/createNext', async (params) => {
   const { data } = await axios.post('/next', params);
   return data
})
const initialState = {
   items: [],
   isUpdated: false,
   changed: 'none',
   fetched: 'loading',
   next: [],
}

const routesSlice = createSlice({
   name: 'routes',
   initialState,
   reducers: {
      setRoutes: (state, action) => {
         state.items = action.payload
         state.fetched = 'loaded'
      },
      setUpdate: (state, action) => {
         state.changed = action.payload
      }
   },

})

export const { setRoutes, setUpdate } = routesSlice.actions;
export default routesSlice.reducer