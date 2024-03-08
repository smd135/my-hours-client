import { createSlice } from '@reduxjs/toolkit'
import { filter } from '../utils/filter'

const initialState = {
   month: 0,
   year: 0,
   totalHours: 0,
   items: [],
   status: 'loading'
}

export const filterSlice = createSlice({
   name: "filter",
   initialState,
   reducers: {
      setMonth: (state, action) => {
         state.month = action.payload
      },
      setYear: (state, action) => {
         state.year = action.payload
      },
      setFiltered: (state, action) => {
         const currentM = Number(state.month);
         const items = action.payload;
         state.items = filter(items, currentM)
      },
      setTotalHours: (state) => {
         const hours = state.items.reduce((total, obj) => total + obj.diff, 0);
         state.totalHours = hours

      }
   }
})
export const { setMonth, setYear, setFiltered, setTotalHours } = filterSlice.actions
export default filterSlice.reducer;