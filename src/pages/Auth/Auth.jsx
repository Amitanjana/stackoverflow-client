import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Auth.css'
import icon from '../../assets/icon.svg'
import AboutAuth from './AboutAuth'
import { signup, login, loginWithGoogle } from '../../Actions/auth'
import GoogleButton from 'react-google-button'
import { auth, provider } from '../../firebase'
import { getIdToken, signInWithPopup } from "firebase/auth"

const Auth = () => {

  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSwitch = () => {
    setIsSignup(!isSignup)
    setName('')
    setEmail('')
    setPassword('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email && !password) {
      alert("Enter email and password")
    }
    if (isSignup) {
      if (!name) {
        alert("Enter a name to continue")
      }
      dispatch(signup({ name, email, password }, navigate))
    } else {
      dispatch(login({ email, password }, navigate))
    }

  }

  function handleGoogle() {
    signInWithPopup(auth, provider).then(async (res) => {
      getIdToken(res.user).then(token => {
        console.log('loading....')
        dispatch(loginWithGoogle({ userToken: token, email: res.user.email, name: res.user.displayName }, navigate))
      }).catch(error => {
        console.log(error)
        alert('something went wrong.')
      }).catch(err => {
        console.log(err)
      })
    }
    ).catch((err) => {
      console.log(err)
    })
  }

  return (

    <section className='auth-section'>
      {isSignup && <AboutAuth />}

      <div class='auth-container-2'>
        {!isSignup && <img src={icon} alt='stack overflow' className='login-logo' width="100px" />}

        <form onSubmit={handleSubmit} >

          {
            isSignup && (
              <label htmlFor='name'>
                <h4>Display Name</h4>
                <input type="text" id='name' name='name' value={name} onChange={(e) => { setName(e.target.value) }} />
              </label>
            )
          }

          <label htmlFor="email">
            <h4>Email</h4>
            <input type="email" name='email' id='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
          </label>
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4 >Password</h4>
              {!isSignup && (<p style={{ color: "#007ac6", fontSize: "13px" }}>forget password?</p>)}

            </div>

            <input type="password" name='password' id='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
            {isSignup && <p style={{ color: "#666767", fontSize: "13px" }}>Passwords must contain at least eight characters,<br /> including at least 1 letter and 1 number.

            </p>}
          </label>
          {
            isSignup && (
              <label htmlFor="check">
                <input type="checkbox" id='check' />
                <p style={{ fontSize: "13px" }}>Opt-in to receive occasional <br /> product updates, user research invitations, <br /> company announcements, and digests.</p>
              </label>
            )
          }
          <button type='submit' className='auth-btn'>{isSignup ? 'Signup' : 'Log in'}</button>
          {

            isSignup && (
              <p style={{ color: "#666767", fontSize: "13px" }} >By clicking “Sign up”, you agree to our <span style={{ color: "#007ac6" }}> terms of <br />  service</span> and acknowledge that you have read and understand our <span style={{ color: "#007ac6" }}> privacy policy </span> and<span style={{ color: "#007ac6" }}> code of conduct.</span></p>
            )

          }
          <GoogleButton
            style={{ width: "full", margin: "8px",backgroundColor:"#009dff",borderRadius:'5px',padding:'4px' }}
            onClick={handleGoogle}
          />

        </form>
        <p>
          {isSignup ? 'already have an account?' : "Don't have an account?"}
          <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{isSignup ? "Log in" : "Sign up"}</button>
        </p>
      </div>



    </section>

  )
}

export default Auth
