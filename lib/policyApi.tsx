import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from "next-redux-wrapper";

interface IArtist {
  id: number,
  name: string
}



export const policyApi = createApi({
    reducerPath: 'policyApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['Policies'],
    extractRehydrationInfo(action, { reducerPath }) {
      if (action.type === HYDRATE) {
        return action.payload[reducerPath];
      }
    },
    endpoints: (builder) => ({
     
        fetchPolicy: builder.query<IArtist[], void>({
        query: () => ('/policy/get'),
        providesTags:['Policies']

      }), 
      addPolicy: builder.mutation<void, any >({
        query: (val) => ({
          url: "/policy/add",
          method: "POST",
          body: {name:val.name,policyAmount:val.amount,policyLimit:val.limit}
        }),
        invalidatesTags:['Policies']

      }),
      editArtist: builder.mutation<void, { name: string,uid:string }>({
        query: (val) => ({
          url: `/policy/update/${val.uid}`,
          method: "PATCH",
          body: {name:val.name}
        }),
        invalidatesTags:['Policies']

      }),
      deletePolicy: builder.mutation<void, string >({
        query: (id) => ({
          url: `/policy/delete/${id}`,
          method: "DELETE"
        }),
        invalidatesTags:['Policies']

      })
    }),
  });
  
  export const {
    useFetchPolicyQuery,
    useDeletePolicyMutation,
    useEditArtistMutation,
    useAddPolicyMutation,
    util: { getRunningOperationPromises },

  } = policyApi;


  export const { fetchPolicy } = policyApi.endpoints;
  