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
      invalidatesTags: ["todo"],
    }),
    getTodo: builder.query({
      query: (params) => ({
        method: "get",
        url: "/todo",
        params,
      }),
      providesTags: ["todo"],
    }),
    editTodo: builder.mutation({
      query: (body) => ({
        method: "PUT",
        url: `/todo/${body.params}`,
        body: body.body,
      }),
      invalidatesTags: ["todo"],
    }),
    deleteTodo: builder.mutation({
      query: (params) => ({
        method: "DELETE",
        url: `/todo/${params}`,
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
  useAddTodoMutation,
  useGetTodoQuery,
  useEditTodoMutation,
  useDeleteTodoMutation,
  useDecodeTokenMutation,
} = fireApi;
