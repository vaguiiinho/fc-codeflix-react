import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { Result, Results } from "../../types/category"
import { apiSlice } from "../api/apiSlice"

export interface Category {
  id: string
  name: string
  delete_at: null | string
  is_active: boolean
  created_at: string
  updated_at: string
  description: null | string
}

const endpointUrl = "/categories"
function deleteCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}}`,
    method: "DELETE",
  }
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Results, void>({
      query: () => `${endpointUrl}`,
      providesTags: ["Categories"],
    }),
    deleteCategory: mutation<Result, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ["Categories"],
    })
  })
})

const category: Category = {
  id: "1",
  name: "Olive",
  description: "description 1",
  is_active: true,
  delete_at: null,
  created_at: "Sat Oct 22 2022 20:40:24 GMT-0300",
  updated_at: "Sat Oct 22 2022 20:40:24 GMT-0300"
}


export const initialState = [
  category,
  { ...category, id: "2", name: "Peach" },
  { ...category, id: "3", name: "Apple" },
  { ...category, id: "4", name: "Banana", is_active: false }

]

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    createCategory(state, action) {
      state.push(action.payload)
    },
    updateCategory(state, action) {
      const index = state.findIndex(c => c.id === action.payload.id)
      state[index] = action.payload
    },
    deleteCategory(state, action) {
      const index = state.findIndex(c => c.id === action.payload.id)
      state.splice(index, 1)
    },
  },
})

//selectors
export const selectCategories = (state: RootState) => state.categories

//selectors category by id
export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories.find(c => c.id === id)
  return (
    category || {
      id: "",
      name: "",
      description: "",
      is_active: false,
      delete_at: null,
      created_at: "",
      updated_at: "",
    }
  )
}
export default categoriesSlice.reducer
export const {
  createCategory,
  updateCategory,
  deleteCategory
} = categoriesSlice.actions

export const {
  useGetCategoriesQuery,
  useDeleteCategoryMutation
} = categoriesApiSlice