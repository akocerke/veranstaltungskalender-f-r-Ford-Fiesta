// src/api/users.js
import api from './api';

export const getEventsByUser = async () => {
  try {
    // Lese den Token aus dem Local Storage
    const token = localStorage.getItem('accessToken');
    console.log('Token aus LocalStorage:', token); // Debugging-Ausgabe

    if (!token) {
      throw new Error('Kein Token gefunden, bitte anmelden.');
    }

    // API-Anfrage
    const response = await api.get('/users/events', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Events-Antwort:', response.data); // Debugging-Ausgabe

    return response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Events:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Funktion, um die Dashboard-Daten des Users zu holen
export const getUserDashboard = async () => {
  try {
    // Lese den Token aus dem Local Storage
    const token = localStorage.getItem('accessToken');
    console.log('Token aus LocalStorage:', token); // Debugging-Ausgabe

    if (!token) {
      throw new Error('Kein Token gefunden, bitte anmelden.');
    }

    // API-Anfrage mit Authentifizierungs-Header
    const response = await api.get('/users/dashboard', {
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


// Funktion, um die Profil-Daten des Benutzers abzurufen
export const getUserProfile = async () => {
  try {
    // Lese den Token aus dem Local Storage
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Kein Token gefunden, bitte anmelden.');
    }

    // API-Anfrage
    const response = await api.get('/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Profil-Daten:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateUserProfile = async (updatedData) => {
  try {
    // Lese den Token aus dem Local Storage
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Kein Token gefunden, bitte anmelden.');
    }

    // API-Anfrage zum Aktualisieren der Profil-Daten
    const response = await api.put('/users/profile', updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Fehler beim Aktualisieren der Profil-Daten:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Funktion zum Aktualisieren eines Events
export const updateEvent = async (eventData) => {
  try {
    // Token aus dem Local Storage holen
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Kein Token gefunden, bitte anmelden.');
    }

    // Füge den Authentifizierungsheader zur Anfrage hinzu
    const response = await api.put('users/events/update', eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Events:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : 'Server Error');
  }
};


// Funktion zum Löschen eines Events
export const deleteEvent = async (eventId) => {
  try {
    // Lese den Token aus dem Local Storage
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Kein Token gefunden, bitte anmelden.');
    }

    // Füge den Authentifizierungsheader zur Anfrage hinzu
    const response = await api.delete('users/events/delete', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { eventId }, // Die eventId wird im Anfragekörper gesendet
    });

    return response.data;
  } catch (error) {
    console.error('Fehler beim Löschen des Events:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : 'Server Error');
  }
};

// Funktion um das Passwort des angemeldeten Benutzers zu ändern
export const changeUserPassword = async (userId, oldPassword, newPassword) => {
  const token = localStorage.getItem('accessToken');

  try {
    const response = await api.post('users/password', {
      oldPassword,
      newPassword,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.message; // Erfolgsnachricht zurückgeben
  } catch (error) {
    // Fehlerbehandlung
    throw new Error(error.response?.data?.message || 'Fehler beim Ändern des Passworts');
  }
};


// POST /users/events/rate - angemeldete Benutzer kann ein Event bewerten
export const changeRate = async (eventId, rating) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.error('User is not authenticated');
    return;
  }

  try {
    const response = await api.post('/users/events/rate', {
      eventId,
      rating,
    }, {
      headers: {
        'Authorization': `Bearer ${token}` // Füge den Token zur Authentifizierung hinzu
      }
    });

    console.log(response.data.message); // Erfolgreiche Rückmeldung
  } catch (error) {
    console.error('Error submitting rating:', error.response?.data.message || error.message);
  }
};

