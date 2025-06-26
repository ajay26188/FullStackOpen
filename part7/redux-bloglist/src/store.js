import notificationReducer from "./reducers/notificationReducer";
import { notificationTypeReducer } from "./reducers/notificationReducer";
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

import {configureStore} from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        user: userReducer,
        users: usersReducer,
        notificationMessage: notificationReducer,
        notificationType: notificationTypeReducer
    }
})

export default store