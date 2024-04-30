import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fireApi = createApi({
  reducerPath: "fireApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        method: "post",
        url: "/login",
        body,
      }),
      transformResponse: (res) => res.data,
    }),
  }),
});

export const { useLoginMutation } = fireApi;
