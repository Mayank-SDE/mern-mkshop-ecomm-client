import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import {
  AllOrdersResponse,
  MessageResponse,
  NewOrderRequest,
  OrderDetailsResponse,
  UpdateOrderRequest,
} from '../../types/api-types';

export const orderAPI = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
  }),
  tagTypes: ['orders'],
  endpoints: (builder) => {
    return {
      newOrder: builder.mutation<MessageResponse, NewOrderRequest>({
        query: (order) => {
          return {
            url: 'new',
            method: 'post',
            body: order,
          };
        },
        invalidatesTags: ['orders'],
      }),
      deleteOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
        query: ({ userId, orderId }) => {
          return {
            url: `${orderId}?id=${userId}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['orders'],
      }),
      updateOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
        query: ({ userId, orderId }) => {
          return {
            url: `${orderId}?id=${userId}`,
            method: 'PUT',
          };
        },
        invalidatesTags: ['orders'],
      }),
      myOrders: builder.query<AllOrdersResponse, string>({
        query: (id) => `my?id=${id}`,
        providesTags: ['orders'],
      }),

      allOrders: builder.query<AllOrdersResponse, string>({
        query: (id) => `all?id=${id}`,
        providesTags: ['orders'],
      }),

      orderDetails: builder.query<OrderDetailsResponse, string>({
        query: (id) => id,
        providesTags: ['orders'],
      }),
    };
  },
});

export const {
  useNewOrderMutation,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
  useAllOrdersQuery,
  useMyOrdersQuery,
  useOrderDetailsQuery,
} = orderAPI;
