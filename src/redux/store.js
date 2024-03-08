import { configureStore } from '@reduxjs/toolkit'
import routes from './features/routesSlice'
import authReducer from './features/authSlice'
import filterReducer from './features/filterSlice'

export const store = configureStore({
   reducer: {
      routes: routes,
      auth: authReducer,
      filter: filterReducer
   },
})
