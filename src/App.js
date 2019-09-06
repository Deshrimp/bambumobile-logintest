import React from 'react'
import './App.css'
import logo from './images/svenson-logo.png'
import sadguy from './images/svenson-guy.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import { Row, Col } from 'reactstrap'
import InputWithPlaceholder from './Components/InputWithPlaceholder'

import firebase from 'firebase'
import 'firebase/auth'

import styled from 'styled-components'
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCLx8E4WRAqC2iO4oYLd6LtWNgRk6uViXQ',
  authDomain: 'login-9fc49.firebaseapp.com',
  databaseURL: 'https://login-9fc49.firebaseio.com',
  projectId: 'login-9fc49',
  storageBucket: 'login-9fc49.appspot.com',
  messagingSenderId: '377221192934',
  appId: '1:377221192934:web:830c8d266a3b9aaf4bef27',
})

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  color: #9e9e9e;
`

const Middle = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  height: 100vh;
  text-align:center;
`

const LoggedInView = ({ username, logout }) => (
  <div>
    <div>Hello, {username}</div>
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  </div>
)
class App extends React.PureComponent {
  state = {
    username: '',
    password: '',
    loggedIn: false,
    loggedInUser: '',
    error: false,
    message: '',
  }

  /*  constructor() {
     // check if the user is already logged in so we can show a log out button
    // const loggedInUser = firebaseApp.auth().currentUser

    } */

  handleLogin = async () => {
    const { username, password } = this.state
    console.log('Logging in...')
    try {
      const res = await firebaseApp
        .auth()
        .signInWithEmailAndPassword(username, password)
      console.log('Login successful', res)
      const currentUser = firebaseApp.auth().currentUser
      console.log(currentUser.email)
      this.setState({
        loggedIn: true,
        error: false,
        loggedInUser: currentUser.email,
      })
    } catch (e) {
      console.log('Login failed: ', e)
      this.setState({ error: true, message: e.message, loggedInUser: '' })
    }
  }

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value })
  }

  handleLogout = e => {
    firebaseApp.auth().signOut()
    this.setState({
      loggedIn: false,
      loggedInUser: '',
      error: false,
      message: 'You have been logged out successfully',
    })
  }

  render() {
    const {
      handleChange,
      handleLogin,
      handleLogout,
      state: { loggedIn, loggedInUser, message },
    } = this
    return (
      <div className='App'>
        <header className='App-header'> </header>

        <div className='row'>
          <div id='left-red' className='col-3'>
            <img src={logo} id='logo' alt='logo' />
            <img src={sadguy} id='sad-guy' alt='sad-guy' />
          </div>
          <div className='col'>
            <Middle className='offset-md-3'>
              <div>{message}</div>
              {loggedIn ? (
                <LoggedInView logout={handleLogout} username={loggedInUser} />
              ) : (
                <>
                  <div id="accede">Accede a tu cuenta</div>
                 
                  <div id="ingresa-datos">Ingresa tus datos para continuar</div>
                  <InputWithPlaceholder
                  name='username'
                    onChange={handleChange}
                    width='40%'
                    placeholder='correo@ejemplo.com'
                    type='email'
                    labelText="Correo electrónico"
                    >
                  </InputWithPlaceholder>

                  <InputWithPlaceholder
                    name='password'
                    onChange={handleChange}
                    width='40%'
                    placeholder='placeholder'
                    type='password'
                    labelText='Contraseña'
                    
                  ></InputWithPlaceholder>
                  <div id="olvidaste">¿Olvidaste tu contraseña?</div>
                  <button onClick={handleLogin}>
                    Ingresar
                  </button>
                  
                </>
              )}
            </Middle>
          </div>
        </div>
        <Row>
          <Col className='offset-sm-3'>
            <Footer>
              <p> &copy; Svenson. Todos los derechos reservados.</p>
            </Footer>
          </Col>
        </Row>
      </div>
    )
  }
}

export default App
