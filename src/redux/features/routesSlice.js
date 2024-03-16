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
   status: 'loading',
   next: [],
}

const routesSlice = createSlice({
   name: 'routes',
   initialState,
   reducers: {
      setRoutes: (state, action) => {
         state.items = action.payload
      }
   },
   extraReducers: (builder) => {
      // 'type: fetchRoutes'
      builder.addCase(fetchRoutes.pending, (state) => {
         state.items = [];
         state.status = 'loading';
      })
         .addCase(fetchRoutes.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'loaded';
            state.isUpdated = false;
         })
         .addCase(fetchRoutes.rejected, (state) => {
            state.items = [];
            state.status = 'error';
         })
         // 'type: fetchById'
         .addCase(fetchById.pending, (state) => {
            state.items = []
            state.status = 'loading';
         })
         .addCase(fetchById.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'loaded';
            state.isUpdated = false;
         })
         .addCase(fetchById.rejected, (state) => {
            state.items = [];
            state.status = 'error';
         })
         // 'type: createRoute'
         .addCase(createRoute.fulfilled, (state) => {
            state.isUpdated = true;
         })
         // 'type: deleteRoute' 
         .addCase(deleteRoute.fulfilled, (state) => {
            state.isUpdated = true;
         })
         // 'type: editRoute'
         .addCase(editRoute.pending, (state) => {
            state.items = []
            state.status = 'loading';
         })
         .addCase(editRoute.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'loaded';
            state.isUpdated = true;
         })
         .addCase(editRoute.rejected, (state) => {
            state.items = [];
            state.status = 'error';
         })
         // 'type: createNext'
         .addCase(createNext.pending, (state) => {
            state.items = []
            state.status = 'loading';
         })
         .addCase(createNext.fulfilled, (state, action) => {
            state.next = action.payload;
            state.status = 'loaded';
         })
         .addCase(createNext.rejected, (state) => {
            state.next = [];
            state.status = 'error';
         })

   }
})

export const { setRoutes } = routesSlice.actions;
export default routesSlice.reducer