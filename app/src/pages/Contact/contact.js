import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from 'react-simple-captcha'

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [captchaInput, setCaptchaInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadCaptchaEnginge(8) // Initialisiert das Captcha mit Anzahl Zeichen
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validateCaptcha(captchaInput)) {
      setError('Captcha nicht korrekt.')
      return
    }
    console.log('Contact form submitted with:', {
      name,
      email,
      subject,
      message,
    })
    setSubmitted(true)
    setName('')
    setEmail('')
    setSubject('')
    setMessage('')
    setCaptchaInput('')
    setError('')
    loadCaptchaEnginge(6) // Neues Captcha generieren
  }

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-md-center p-5">
        <Col xs={12} md={6}>
          <h1 className="text-center mb-5 headline">Kontakt</h1>
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label className='text-color'>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ihr Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className='text-color'>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ihre Email-Adresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSubject">
              <Form.Label className='text-color'>Betreff</Form.Label>
              <Form.Control
                type="text"
                placeholder="Betreff"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label className='text-color'>Nachricht</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Ihre Nachricht"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className='text-color mb-2'>Captcha</Form.Label>
              <LoadCanvasTemplate 
                className="mt-3"
              />

              <Form.Control
                type="text"
                placeholder="Captcha eingeben"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                required
                className='mt-3'
              />
            </Form.Group>
            {submitted && (
            <Alert variant="success" className='mt-4'>Nachricht erfolgreich gesendet!</Alert>
          )}
          {error && <Alert variant="danger" className='mt-4'>{error}</Alert>}
            <Button type="submit" className="w-100 primary mt-3">
              Absenden
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Contact
