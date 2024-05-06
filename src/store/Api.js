import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fireApi = createApi({
  reducerPath: "fireApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      if (localStorage.getItem("token")) {
        headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        method: "post",
        url: "/login",
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        method: "post",
        url: "/signup",
        body,
      }),
    }),
    getProduct: builder.query({
      query: (params) => ({
        method: "get",
        url: "/products",
        params,
      }),
      providesTags: ["todo"],
    }),
    editCart: builder.mutation({
      query: (params) => ({
        method: "PUT",
        url: `/products/${params}/cart`,
      }),
      invalidatesTags: ["todo"],
    }),
    decodeToken: builder.mutation({
      query: (body) => ({
        method: "post",
        url: "/decodeToken",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProductQuery,
  useEditCartMutation,
  useDecodeTokenMutation,
} = fireApi;
