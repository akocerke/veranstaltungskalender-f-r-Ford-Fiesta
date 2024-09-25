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
