import { useState } from "react"
import loginService from '../services/login'
import blogService from '../services/blogs.js'
import Notification from './Notification'
import { notificationSetter } from "../reducers/notificationReducer.js"
import { notificationTypeSetter } from "../reducers/notificationReducer.js"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../reducers/userReducer.js"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //const user = useSelector(state => state.user)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const userInfo = await loginService.login({ username, password })
            blogService.setToken(userInfo.token)
            window.localStorage.setItem('loggedUser', JSON.stringify(userInfo))
            dispatch(login(userInfo))

            setUsername('')
            setPassword('')
            navigate('/')
        }
        catch(error) {
            console.error(error.message)
            dispatch(notificationSetter('Wrong username or password'))
            dispatch(notificationTypeSetter('failure'))
            setTimeout(() => 
            {dispatch(notificationSetter(null))
            },5000)
        }
    }
    return (
        <div>
            <h2>log in to application</h2>
            <Notification />
            <form onSubmit={handleLogin}>
            <div>
                username
                <input
                data-testid='username'
                type="text"
                name='Username'
                value={username}
                onChange={({target}) => setUsername(target.value)}
            />
            </div>

            <div>
                password
                <input
                data-testid='password'
                type="password"
                name='Password'
                value={password}
                onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
            </form>
        </div>
    )                            
}

export default LoginForm