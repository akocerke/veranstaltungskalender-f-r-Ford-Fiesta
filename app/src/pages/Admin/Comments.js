import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { getAdminComments } from '../../api/admins';
import { useLocation } from 'react-router-dom';

const Comments = () => {
  const [comments, setComments] = useState([]); // State für die Kommentare
  const [error, setError] = useState(null); // State für Fehlermeldungen
  const [searchId, setSearchId] = useState(''); // State für die Suche
  const [loading, setLoading] = useState(true); // Zustand für das Laden
  const location = useLocation(); // Holen der aktuellen Location

  // Funktion, um die Kommentare abzurufen
  const fetchComments = async () => {
    setLoading(true); // Ladezustand aktivieren
    try {
      const data = await getAdminComments(); // Rufe die Kommentare von der API ab
      setComments(data); // Setze die Kommentare im State
      setError(null); // Setze den Fehlerzustand zurück, falls vorher ein Fehler aufgetreten ist
    } catch (error) {
      setError(error.message); // Fehlerbehandlung
    } finally {
      setLoading(false); // Ladezustand deaktivieren
    }
  };

  // Kommentare abrufen, wenn die Komponente geladen wird oder sich die Route ändert
  useEffect(() => {
    fetchComments();
  }, [location]); // Hier auf location reagieren

  // Such-Handler
  const handleSearch = (e) => {
    e.preventDefault(); // Verhindert das Standard-Formularverhalten
    if (searchId) {
      // Filtere die Kommentare nach der eingegebenen ID
      const filteredComments = comments.filter(
        (comment) => comment.id.toString() === searchId
      );
      setComments(filteredComments); // Setze die gefilterten Kommentare
    } else {
      fetchComments(); // Wenn keine Such-ID eingegeben, alle Kommentare abrufen
    }
  };

  // Funktion zum Löschen eines Kommentars
  const handleDelete = async (commentId) => {
    if (window.confirm('Möchten Sie diesen Kommentar wirklich löschen?')) {
      try {
        // Hier kann die Löschfunktionalität implementiert werden
        console.log('Kommentar löschen:', commentId);
        // Füge hier den API-Aufruf zum Löschen des Kommentars hinzu

        // Nach dem Löschen die Kommentare erneut abrufen
        await fetchComments();
      } catch (error) {
        setError('Fehler beim Löschen des Kommentars.'); // Fehlerbehandlung
      }
    }
  };

  // Ladeanzeige
  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Lade Kommentare...</p>
      </div>
    );
  }

  // Fehleranzeige
  if (error) {
    return (
      <Container className="mt-5 mb-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <h5 className='headline text-success mt-3 mb-3 text-lg-start'>Kommentare verwalten</h5>

      {/* Suchfeld und Button */}
      <Form className="mb-3" onSubmit={handleSearch}>
        <Form.Group controlId="searchId">
          <Form.Label>Kommentar ID suchen</Form.Label>
          <Form.Control
            type="text"
            placeholder="Geben Sie die Kommentar-ID ein"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)} // Suchfeld mit dem State verknüpfen
          />
        </Form.Group>
        <Button variant="primary" className="mt-2" type="submit">
          Suchen
        </Button>
      </Form>

      {/* Tabelle */}
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
                  <Button variant="danger" className='ms-2' onClick={() => handleDelete(comment.id)}>
                    Löschen
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
    </Container>
  );
};

export default Comments;
