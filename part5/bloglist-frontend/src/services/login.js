import axios from 'axios'
const baseUrl = '/api/login'

const login = async(credentials) => {
    const response = await axios.post(baseUrl,credentials)
    //console.log(response.data)
    return response.data //it return user info such as token, username, id
    
}

export default {login}