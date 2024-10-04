import React, { useState, useEffect } from 'react'
import {
  Container,
  Table,
  Button,
  Form,
  Alert,
  Spinner,
  Modal,
  Toast,
} from 'react-bootstrap'
import { getAdminComments, deleteAdminComment } from '../../api/admins'
import { useLocation } from 'react-router-dom'

const Comments = () => {
  const [comments, setComments] = useState([])
  const [error, setError] = useState(null)
  const [searchId, setSearchId] = useState('')
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [currentCommentId, setCurrentCommentId] = useState(null)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVariant, setToastVariant] = useState('success')
  const location = useLocation()

  const fetchComments = async () => {
    setLoading(true)
    try {
      const data = await getAdminComments()
      setComments(data)
      setError(null)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [location])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchId) {
      const filteredComments = comments.filter(
        (comment) => comment.id.toString() === searchId
      )
      setComments(filteredComments)
    } else {
      fetchComments()
    }
  }

  const handleShowModal = (commentId) => {
    setCurrentCommentId(commentId)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setCurrentCommentId(null)
  }

  const handleDelete = async () => {
    if (currentCommentId) {
      try {
        const response = await deleteAdminComment(currentCommentId)
        setToastMessage(response.message)
        setToastVariant('success')
        await fetchComments()
      } catch (error) {
        setToastMessage(error.message)
        setToastVariant('danger')
      }
      handleCloseModal()
    }
  }

  const handleToastClose = () => {
    setToastMessage('')
  }

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Lade Kommentare...</p>
      </div>
    )
  }

  if (error) {
    return (
      <Container className="mt-5 mb-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container className="mt-5 mb-5">
      <h5 className="headline text-success mt-3 mb-3 text-lg-start">
        Kommentare verwalten
      </h5>

      <Form className="mb-3" onSubmit={handleSearch}>
        <Form.Group controlId="searchId">
          <Form.Label className="text-color fw-bold">
            Kommentar ID suchen
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Geben Sie die Kommentar-ID ein"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </Form.Group>
        <Button variant="outline-primary" className="mt-3" type="submit">
          <i className="bi bi-search"></i> Suchen
        </Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Event ID</th>
            <th>User ID</th>
            <th>Kommentar</th>
            <th>Datum</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <tr key={comment.id}>
                <td>{comment.id}</td>
                <td>{comment.event_id}</td>
                <td>{comment.user_id}</td>
                <td>{comment.comment}</td>
                <td>{new Date(comment.created_at).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    className="ms-2"
                    onClick={() => handleShowModal(comment.id)}
                  >
                    <i className="bi bi-trash3"></i>
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                Keine Kommentare gefunden.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} className="bg-mordal">
        <Modal.Header closeButton>
          <Modal.Title className="text-color headline2">
            Kommentar löschen
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Möchten Sie den Kommentar mit der{' '}
          <span className="fw-bold">ID {currentCommentId}</span> wirklich
          löschen?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleCloseModal}>
            Abbrechen
          </Button>
          <Button variant="outline-danger" onClick={handleDelete}>
            Löschen
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast-Benachrichtigung */}
      <Toast
        onClose={handleToastClose}
        show={!!toastMessage}
        delay={3000}
        autohide
        className={`position-fixed bottom-50 start-50 translate-middle-x m-3 bg-${toastVariant}`}
        style={{ zIndex: 1050 }}
      >
        <Toast.Header>
          <strong className="me-auto">Benachrichtigung</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{toastMessage}</Toast.Body>
      </Toast>
    </Container>
  )
}

export default Comments
