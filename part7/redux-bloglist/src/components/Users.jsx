import { useState, useEffect } from "react"
import axios from "axios"
import { Link, Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

const Users = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    return (
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <td> </td>
                        <td><strong>blogs created</strong></td>
                    </tr>
                    {users.map(user => 
                        <tr key={user.id}>
                            <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                            <td>{user.blogs.length}</td>
                        </tr>
                        )}
                </tbody>
            </table>
        </div>
    )
}

export default Users