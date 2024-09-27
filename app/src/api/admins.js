// src/api/admins.js
import api from './api';

export const getAdmins = async () => {
  // Lese den Token aus dem Local Storage
  const token = localStorage.getItem('accessToken');
  console.log('Token aus LocalStorage:', token); // Debugging-Ausgabe

  if (!token) {
    throw new Error('Kein Token gefunden, bitte anmelden.');
  }
  try {
    // API-Anfrage
    const response = await api.get('/admins', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Admins:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Funktion, um die Dashboard-Daten für Admins 
export const getAdminDashboard = async () => {
  try {
    // Lese den Token aus dem Local Storage
    const token = localStorage.getItem('accessToken');
    console.log('Token aus LocalStorage:', token); // Debugging-Ausgabe

    if (!token) {
      throw new Error('Kein Token gefunden, bitte anmelden.');
    }

    // API-Anfrage mit Authentifizierungs-Header
    const response = await api.get('/admins/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Dashboard-Antwort:', response.data); // Debugging-Ausgabe

    return response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Dashboard-Daten:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// GET /admin/events - Alle Events abrufen
export const getAdminEvents = async () => {
  try {
    // Lese den Token aus dem Local Storage
    const token = localStorage.getItem('accessToken');
    console.log('Token aus LocalStorage:', token); // Debugging-Ausgabe

    if (!token) {
      throw new Error('Kein Token gefunden, bitte anmelden.');
    }

    // API-Anfrage mit Authentifizierungs-Header
    const response = await api.get('/admins/events', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Events-Antwort:', response.data); // Debugging-Ausgabe

    return response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Event-Daten:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// DELETE /admin/comments/delete - Löschen eines Kommentars
export const deleteAdminComment = async (id) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Kein Token gefunden, bitte anmelden.');
    }

    // Senden Sie die Anfrage an den Server
    const response = await api.delete('/admins/comments/delete', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        id, // ID des zu löschenden Kommentars
      },
    });

    console.log('Kommentar gelöscht:', response.data); // Debugging-Ausgabe
    return response.data; // Gibt die Antwort der API zurück
  } catch (error) {
    console.error('Fehler beim Löschen des Kommentars:', error.response ? error.response.data : error.message);
    throw error; // Wirf den Fehler weiter, um ihn im Frontend zu behandeln
  }
};

// DELETE /admin/events/delete - Löschen eines Events
export const deleteAdminEvent = async (eventId) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Kein Token gefunden, bitte anmelden.');
    }

    // Füge die Event-ID in die URL ein
    const response = await api.delete(`/admins/events/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { id: eventId }, // Die ID kann hier im Body, wird aber normalerweise nicht verwendet
    });

    return response.data;
  } catch (error) {
    console.error('Fehler beim Löschen des Events:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : 'Server Error');
  }
};

// GET /admin/comments - Alle Kommentare abrufen
export const getAdminComments = async () =>{
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Kein Token gefunden, bitte anmelden.');
    }

    // Füge die Event-ID in die URL ein
    const response = await api.get(`/admins/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Comments-Antwort:', response.data); // Debugging-Ausgabe

    return response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Comment-Daten:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// GET /admin/violations - Abrufen aller gemeldeten Verstöße
export const getViolations = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Kein Token gefunden, bitte anmelden.');
    }

    // Füge die Event-ID in die URL ein
    const response = await api.get(`/admins/violations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Violations-Antwort:', response.data); // Debugging-Ausgabe

    return response.data; // Rückgabe der vollständigen Antwort
  } catch (error) {
    console.error('Fehler beim Abrufen der Violations-Daten:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Fehler beim Abrufen der Violations-Daten'); // Rückgabe der Fehlerdaten
  }
};

// PUT /admin/violations/status - Aktualisieren des Status eines Verstoßes Eintrags - pending oder resolved
export const updateViolationsStatus = async (id, status) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Kein Token gefunden, bitte anmelden.');
    }

    // Validierung des Status
    if (status !== 'pending' && status !== 'resolved') {
      throw new Error('Invalid status value. It must be "pending" or "resolved".');
    }

    // Senden Sie die Anfrage an den Server
    const response = await api.put('/admins/violations/status', {
      id,
      status,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Status aktualisiert:', response.data); // Debugging-Ausgabe
    return response.data; // Rückgabe der vollständigen Antwort
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Status:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Fehler beim Aktualisieren des Status'); // Rückgabe der Fehlerdaten
  }
};

