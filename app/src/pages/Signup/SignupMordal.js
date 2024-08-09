// src/components/SignupModal.js
import React, { useState } from 'react'
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'

const SignupModal = ({ show, handleClose }) => {
  const [username, setUsername] = useState('') // Füge Zustand für Benutzernamen hinzu
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Signup attempted with:', { username, email, password })
    // Hier würdest du normalerweise eine Anfrage an deinen Server senden
  }

  return (
    <Modal show={show} onHide={handleClose} centered className="bg-mordal">
      <Modal.Header closeButton>
        <Modal.Title className='text-color headline'>Signup</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs={12} md={12}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label className='text-color fw-bold'>Benutzername</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Benutzernamen"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className='text-color fw-bold'>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className='text-color fw-bold'>Passwort</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button className="primary w-100" type="submit">
                  Registrieren
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button className='primary' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

SignupModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default SignupModal
