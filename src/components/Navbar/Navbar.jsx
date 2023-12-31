import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import decode from 'jwt-decode'

import logo from '../../assets/logo.png'
import search from '../../assets/search.svg'
import Avatar from '../../components/Avatar/Avatar'
import './Navbar.css'
import { setCurrentUser } from '../../Actions/currentUser'


const Navbar = () => {

    const dispatch =useDispatch()
    var User= useSelector((state) => state.currentUserReducer)
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch({type: 'LOGOUT'})
        navigate('/')
        dispatch(setCurrentUser(null))
    }

    useEffect(() => {   
        const token = User && User.token;
        if(token){
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()) {
                handleLogout()
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
             
    }, [ dispatch])
  return (

    <nav className="main-nav">
        <div className="navbar">

            <Link to='/' className='Nav-item nav-logo'>
                <img src={logo} alt="logo" width='130px' />
            </Link>
            <Link to='/' className='Nav-item nav-btn'>
                About

            </Link>
            <Link to='/' className='Nav-item nav-btn'>
                Products
                
            </Link>
            <Link to='/' className='Nav-item nav-btn'>
                For Teams
                
            </Link>

            <form >
                <input type="text" placeholder='Search...' />
                <img src={search} alt="search" width='16px' className='search-icon'/>
            </form>
            
            {
             User=== null ?
             <Link to='/Auth' className='Nav-item nav-link'>Log In</Link>:
             <>
             <Avatar backgroundColor='#009dff' px='10px' py='5px' borderRadius='50%' color='white'> <Link to= {`/Users/${User.result._id}`} style={{color:'white', textDecoration:'none'}} > {User.result.name.charAt(0).toUpperCase()} </Link> </Avatar> 
             <button className='nav-item nav-links' onClick={handleLogout} style={{marginLeft:"8px"}}>Log Out</button>
             </>
            
        
            }


        </div>
    </nav>
  )
}

export default Navbar
