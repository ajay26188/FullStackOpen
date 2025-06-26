import usersService from '../services/users'
import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers(state,action) {
            return action.payload
        }
    }
})

export const {setUsers} = usersSlice.actions

export const initializeUsers = () => {
    return async dispatch => {
      const users = await usersService.getAll()
      dispatch(setUsers(users))
    }
}

export default usersSlice.reducer