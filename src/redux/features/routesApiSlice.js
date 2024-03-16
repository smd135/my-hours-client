import { apiSlice } from "./apiSlice";

export const routesApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      // create route endpoint
      addroute: builder.mutation({
         query: (data) => ({
            url: '/routes',
            method: 'POST',
            body: data,
         })
      }),
      getRoutes: builder.query({
         query: () => ({
            url: '/routes',
            method: 'GET',
         })
      })
   })
})

export const { useAddrouteMutation, useGetRoutesQuery } = routesApiSlice