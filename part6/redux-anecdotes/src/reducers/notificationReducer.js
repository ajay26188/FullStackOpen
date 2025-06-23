import {createSlice, current} from '@reduxjs/toolkit'

const notificationSlicer = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        removeNotification(state,action) {
            return ''
        }
    }
})

export const {setNotification, removeNotification} = notificationSlicer.actions

export const notificationHandler = (message, time) => {
    return (dispatch) => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(removeNotification())
        },time * 1000)

    }
}

export default notificationSlicer.reducer