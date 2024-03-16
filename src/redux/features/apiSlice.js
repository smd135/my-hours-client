import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// const node_env = import.meta.env.NODE_ENV
// const BASE_URL = node_env ? "http://localhost:5000" : "https://my-hours-api-seven.vercel.app"
const BASE_URL = "https://my-routes-steel.vercel.app/"
const DEV_URL = "http://localhost:5006"
export const apiSlice = createApi({
   baseQuery: fetchBaseQuery({
      baseUrl: DEV_URL,
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': DEV_URL,
      },
      // mode: 'no-cors'
   }),
   tagTypes: ['User'],
   endpoints: (builder) => ({})
})