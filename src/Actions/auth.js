import * as api from '../api'
import { setCurrentUser } from './currentUser'
import { fetchAllUsers } from './users'

export const signup = (authData, navigate) => async (dispatch) => {
    try {
        const {data} = await api.signUp(authData)
        dispatch ({type: 'AUTH', data})
        dispatch(setCurrentUser( JSON.parse(localStorage.getItem('Profile')))) 
        dispatch(fetchAllUsers())
        navigate('/')
    } catch (error) {
        alert(error.response.data.message)
        console.log(error)
    }

}
export const loginWithGoogle=(authData,navigate)=>async(dispatch)=>{
    try {
        const {data} = await api.loginWithGoogle(authData)
        dispatch ({type: 'AUTH', data})
        dispatch(setCurrentUser( JSON.parse(localStorage.getItem('Profile')))) 
        dispatch(fetchAllUsers())
        navigate('/')
    } catch (error) {
        alert(error.response.data.message)
    }
}

export const login = (authData, navigate) => async(dispatch) => { 
    try {
        const {data} = await api.logIn(authData)
        console.log(data)
        dispatch ({type: 'AUTH', data})
        dispatch(setCurrentUser( JSON.parse(localStorage.getItem('Profile')))) 
        navigate('/')
    } catch (error) {
        alert(error.response.data.message)
        console.log(error)
    }

}
