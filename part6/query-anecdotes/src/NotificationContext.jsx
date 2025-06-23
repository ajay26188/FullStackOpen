import { useContext, createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_ANECDOTE':
            return action.payload
        case 'VOTE_ANECDOTE':
            return action.payload
        case 'MUTATION_ERROR':
            return action.payload
        case 'RESET':
            return ''
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, setNotification] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[notification, setNotification]}>
        {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext

