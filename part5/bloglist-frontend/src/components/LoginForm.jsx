import { useState } from "react"
import loginService from '../services/login'
import blogService from '../services/blogs.js'
import Notification from './Notification'
import PropTypes from "prop-types"

const LoginForm = ({setUser, notification, setNotification, notificationType, setNotificationType}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({username, password})

            //save the value to local storage using stringify method
            window.localStorage.setItem('loggedUser',JSON.stringify(user))

            //setting a token value in blogs.js
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        }
        catch(error) {
            console.error(error.message)
            setNotification('Wrong username or password')
            setNotificationType('failure')
            setTimeout(() => 
            {setNotification(null)
            },5000)
        }
    }
    return (
        <div>
                    <h2>log in to application</h2>
                    <Notification notification={notification} notificationType={notificationType} />
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

LoginForm.propTypes = {
    setUser: PropTypes.func.isRequired,
    notification: PropTypes.string.isRequired,
    setNotification: PropTypes.func.isRequired,
    notificationType: PropTypes.string.isRequired,
    setNotificationType: PropTypes.func.isRequired
}

export default LoginForm