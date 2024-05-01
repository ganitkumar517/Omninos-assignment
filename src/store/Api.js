import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fireApi = createApi({
  reducerPath: "fireApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
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
    addTodo: builder.mutation({
      query: (body) => ({
        method: "post",
        url: "/todo",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useAddTodoMutation } =
  fireApi;
