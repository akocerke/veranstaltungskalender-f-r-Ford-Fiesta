// App.js
import React from 'react'
import './styles/App.css'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <Header />
      <Container className="h-100">
        <h2 className="text-center">Willkommen in meiner App</h2>
        <p>Hier ist der Hauptinhalt...</p>
      </Container>
      <Footer />
    </div>
  )
}

export default App
