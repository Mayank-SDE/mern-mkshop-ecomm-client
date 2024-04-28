import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  AllProductResponse,
  CategoriesResponse,
  DeleteProductRequest,
  MessageResponse,
  NewProductRequest,
  ProductResponse,
  SearchProductsRequest,
  SearchProductsResponse,
  UpdateProductRequest,
} from '../../types/api-types';

export const productAPI = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  tagTypes: ['product'],
  endpoints: (builder) => {
    return {
      latestProducts: builder.query<AllProductResponse, string>({
        query: () => 'latest',
        providesTags: ['product'],
      }),
      allProducts: builder.query<AllProductResponse, string>({
        query: (id) => `admin-products?id=${id}`,
        providesTags: ['product'],
      }),
      categories: builder.query<CategoriesResponse, string>({
        query: () => 'categories',
        providesTags: ['product'],
      }),
      searchProducts: builder.query<
        SearchProductsResponse,
        SearchProductsRequest
      >({
        query: ({ price, search, sort, category, page }) => {
          let base = `all?search=${search}&page=${page}`;
          if (price) {
            base += `&price=${price}`;
          }
          if (sort) {
            base += `&sort=${sort}`;
          }
          if (category) {
            base += `&category=${category}`;
          }

          return base;
        },
        providesTags: ['product'],
      }),
      newProduct: builder.mutation<MessageResponse, NewProductRequest>({
        query: ({ formData, id }) => {
          return {
            url: `new?id=${id}`,
            method: 'post',
            body: formData,
          };
        },
        invalidatesTags: ['product'],
      }),
      productDetails: builder.query<ProductResponse, string>({
        query: (id) => id,
        providesTags: ['product'],
      }),
      updateProduct: builder.mutation<MessageResponse, UpdateProductRequest>({
        query: ({ formData, userId, productId }) => {
          return {
            url: `${productId}?id=${userId}`,
            method: 'PUT',
            body: formData,
          };
        },
        invalidatesTags: ['product'],
      }),
      deleteProduct: builder.mutation<MessageResponse, DeleteProductRequest>({
        query: ({ userId, productId }) => {
          return {
            url: `${productId}?id=${userId}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['product'],
      }),
    };
  },
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
  useNewProductMutation,
  useProductDetailsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productAPI;
