import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"

import Home from './components/Home'
import Notifications from './components/Notification'
import BloqueProductos from './components/BloqueProductos'

// Estilos
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

const App =() => {
  const [notification, setNotification] = useState(null)
  const [errorNotification, setErrorNotification] = useState(null)

  return (
    <div>

      <Nav.Link href="http://localhost:3000">Home</Nav.Link>
      <Nav.Link href="http://localhost:3000/productos">Productos</Nav.Link>
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
  )
}

export default App