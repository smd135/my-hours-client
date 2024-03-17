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
         // const currentM = Number(state.month);
         const currentM = Number(3)
         const items = action.payload;
         if (items) {
            state.items = filter(action.payload, currentM)
         }
         state.status = 'fetched'

      },
      setTotalHours: (state) => {
         state.totalHours = state.items.reduce((total, obj) => total + obj.diff, 0);
         // const hours = state.items.reduce((total, obj) => total + obj.diff, 0);
         // state.totalHours = hours

      }
   }
})
export const { setMonth, setYear, setFiltered, setTotalHours } = filterSlice.actions
export default filterSlice.reducer;