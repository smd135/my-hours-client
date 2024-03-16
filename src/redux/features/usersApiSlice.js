import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      // login endpoint
      login: builder.mutation({
         query: (data) => ({
            url: '/auth/login',
            method: 'POST',
            body: data
         }),
      }),
      getme: builder.query({
         query: () => ({
            url: '/auth/me',
            credentials: 'include',
            // mode: 'cors'
         }),
      }),

   })
})

export const { useLoginMutation, useGetmeQuery } = usersApiSlice;