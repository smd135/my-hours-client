import { configureStore } from '@reduxjs/toolkit'
import routes from './features/routesSlice'
import authReducer from './features/authSlice'
import filterReducer from './features/filterSlice'
import { apiSlice } from './features/apiSlice'

export const store = configureStore({
   reducer: {
      routes: routes,
      auth: authReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
      filter: filterReducer
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
   devTools: true

})
