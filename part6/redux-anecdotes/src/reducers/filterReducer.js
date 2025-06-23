import {createSlice} from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        setFilter(state,action) {
            return action.payload
        }
    }
})

/*
const filterReducer = (state='', action) => {
    console.log(state)
    console.log(action)
    switch (action.type) {
        case 'SET_FILTER':
            return action.payload
        default:
            return state
    }
}

//action creator
export const setFilter =(filterInput) => {
    return {
        type: 'SET_FILTER',
        payload: filterInput,
    }
}
*/

export const {setFilter} = filterSlice.actions
export default filterSlice.reducer