import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

interface Category {
  id: string
  name: string
  delete_at: null | string
  is_active: boolean
  created_at: string
  updated_at: string
  description: null | string
}

const category: Category = {
  id: "1",
  name: "Olive",
  description: "description 1",
  is_active: true,
  delete_at: null,
  created_at: "datainit",
  updated_at: "dataUpdate"
}


export const initialState = [
  category,
  { ...category, id: "1", name: "Peach" },
  { ...category, id: "2", name: "Apple" },
  { ...category, id: "3", name: "Banana" }

]

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    createCategory(state, action) { },
    updateCategory(state, action) { },
    deleteCategory(state, action) { },
  },
})

//selectors
export const selectCategories = (state: RootState) => state.categories

export default categoriesSlice.reducer