import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../utils/axios'

// export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
//    // const { data } = await axios.post('/auth/login', params);
//    // return data;

// })
// export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
//    const { data } = await axios.post('/auth/register', params)
//    return data;
// })

// export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
//    // const { data } = await axios.get('/auth/me');
//    // return data;
//    const res = await fetch('http://localhost:5000/auth/me', {
//       method: "GET",
//       credentials: "include",
//    })
//    const data = res.json()
//    console.log(data)
// })

const initialState = {
   userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
   status: 'loading'
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setCredentials: (state, action) => {
         state.userInfo = action.payload;
         localStorage.setItem('userInfo', JSON.stringify(action.payload))
      },
      logout: (state) => {
         state.userInfo = null
         localStorage.removeItem('userInfo');
      },
   },

})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer