import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"

import Home from './components/Home'
import Notifications from './components/Notification'
import BloqueProductos from './components/BloqueProductos'
import LoginForm from './components/LoginForm'

import productoService from './services/producto'
import loginService from './services/login'

// Estilos
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

const App = () => {
  const [notification, setNotification] = useState(null)
  const [errorNotification, setErrorNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedCustomerappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      productoService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <LoginForm
      handleLogin={handleLogin}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
    />
  )

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedCustomerappUser', JSON.stringify(user)
      )

      productoService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorNotification('Wrong credentials')
      setTimeout(() => {
        setErrorNotification(null)
      }, 5000)
    }
  }

  return (
    <div className="container">
      {user === null ?
        loginForm() :
        <div>
          <Navbar expand="lg" className="bg-body-tertiarys">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className='me-auto'>
              <Nav.Link href="http://localhost:3000">Home</Nav.Link>
              <Nav.Link href="http://localhost:3000/productos">Productos</Nav.Link>
              <Button onClick={() => logout()}>Cerrar sesión</Button>
              </Nav>
              
            </Navbar.Collapse>
          </Navbar>

          <h1>Aplicación de productos - Arquitectura web</h1>

          <Notifications.Notification message={notification} />
          <Notifications.ErrorNotification message={errorNotification} />

          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<BloqueProductos setNotification={setNotification} setErrorNotification={setErrorNotification} />} />
            </Routes>
          </Router>
        </div>
      }



    </div>
  )
}

export default App