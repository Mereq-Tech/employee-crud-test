import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the API service
export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  tagTypes: ['Employee'], // Tags for caching and refetching
  endpoints: (builder) => ({
    // Fetch all employees
    fetchEmployees: builder.query({
      query: () => '/employees',
      providesTags: ['Employee'], // Invalidate this tag on mutations
    }),
    // Fetch a single employee by ID
    fetchEmployeeById: builder.query({
      query: (id) => `/employees/${id}`,
      providesTags: (result, error, id) => [{ type: 'Employee', id }],
    }),
    // Add a new employee
    addEmployee: builder.mutation({
      query: (newEmployee) => ({
        url: '/employees',
        method: 'POST',
        body: newEmployee,
      }),
      invalidatesTags: ['Employee'], // Refetch employees after addition
    }),
    // Update an existing employee
    updateEmployee: builder.mutation({
      query: ({ id, ...updatedEmployee }) => ({
        url: `/employees/${id}`,
        method: 'PUT',
        body: updatedEmployee,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Employee', id }],
    }),
    // Delete an employee
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Employee'], // Refetch employees after deletion
    }),
  }),
});


export const {
  useFetchEmployeesQuery,
  useFetchEmployeeByIdQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;


export const employeeReducer = employeeApi.reducer;
