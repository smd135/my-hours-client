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
      }),
      getRouteById: builder.query({
         query: (id) => ({
            url: `/routes/${id}`
         })
      }),
      editRoute: builder.mutation({
         query: (data) => ({
            method: "PUT",
            url: `/routes`,
            body: data
         })
      }),
      deleteRoute: builder.mutation({
         query: (params) => ({
            method: 'DELETE',
            url: `/routes/${params}`,
         })
      })
   })
})

export const { useAddrouteMutation, useGetRoutesQuery, useGetRouteByIdQuery, useEditRouteMutation, useDeleteRouteMutation } = routesApiSlice