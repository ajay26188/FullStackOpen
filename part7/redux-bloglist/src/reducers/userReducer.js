import loginService from '../services/login'
import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        login(state, action) {
            //console.log(action.payload)
            return action.payload
        },
        
        logout (state, action) {
            return null
        }
    }
})

export const {login, logout} = userSlice.actions
  

export default userSlice.reducer