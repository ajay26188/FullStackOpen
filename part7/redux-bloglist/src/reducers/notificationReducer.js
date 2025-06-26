const notificationReducer = (state='', action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
            return action.payload
        default:
            return state
    }

}

export const notificationSetter = (message) => {
    return {
        type: 'SET_NOTIFICATION',
        payload: message,
    }
}

export const notificationTypeReducer = (state='',action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION_TYPE':
            return action.payload
        default:
            return state
    }
}

export const notificationTypeSetter = (message) => {
    return {
        type: 'SET_NOTIFICATION_TYPE',
        payload: message,
    }
}

export default notificationReducer