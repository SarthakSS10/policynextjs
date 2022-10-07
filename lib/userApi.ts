import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

 interface IUser {
    id: number,
    name: string
  }

export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Users','UsersId','Policy'],
  endpoints: (builder) => ({
    
    fetchUser: builder.query<IUser[], void>({
        query: () => ('/user/get'),
        providesTags:['Users']
      }),
      fetchUserOnId: builder.query<IUser[], void>({
        query: (id) => (`/user/get/${id}`),
        providesTags:['UsersId']

      }),
      getPolicyStatus:  builder.query<IUser[], void>({
        query: () => ('/user/getPolicies'),
        providesTags: (result, error, arg) =>
        {  console.log(result);
        
        return result
          ? [...result.map(({ id }) => ({ type: 'Policy' as const, id })), 'Policy']
          : ['Policy']}
      }),
      getAlbumRating: builder.query({
        query: () => ('/user/getranking'),
      }),
      addUser: builder.mutation<void, { name: string,uid:string }>({
        query: (val) => ({
          url: "/user/add",
          method: "POST",
          body: {name:val.name,uid:val.uid},

        }),
        invalidatesTags:['Users']

      }),
      editUser: builder.mutation<void, { name: string,uid:string }>({
        query: (val) => ({
          url: `/user/update/${val.uid}`,
          method: "PATCH",
          body: {name:val.name},
        }),
        invalidatesTags:['Users']

      }),
      editRatings: builder.mutation<void, { albumId: string,rating: string,uid:string }>({
        query: (val) => ({
          url: `/user/updateAlbum/${val.uid}`,
          method: "PATCH",
          body: {rating:val.rating,albumId:val.albumId},
        }),
        invalidatesTags:['UsersId']

      }),
      deleteUser: builder.mutation<void, string >({
        query: (id) => ({
          url: `/user/delete/${id}`,
          method: "DELETE",

        }),
        invalidatesTags:['Users']

      }),
      addUpdateClaims: builder.mutation<void, { policyId: string,reqAmount: number,id:string , status:string} >({
        query: (val) => ({
            url: `/user/claims/${val.id}`,
            method: "PATCH",
            body: val.reqAmount ? {reqAmount:val.reqAmount,policyId:val.policyId} : {status:val.status,policyId:val.policyId},
          }),
          invalidatesTags: (result, error, arg) => [{ type: 'Policy', id: arg.id }],


      }),
    
  }),
  
});

// Export hooks for usage in functional components
export const {
  useFetchUserQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useEditRatingsMutation,
  useFetchUserOnIdQuery,
  useGetAlbumRatingQuery,
  useAddUpdateClaimsMutation,
  useGetPolicyStatusQuery,
  util: { getRunningOperationPromises },
} = userApi;

// export endpoints for use in SSR
export const { fetchUser ,fetchUserOnId,getPolicyStatus } = userApi.endpoints;