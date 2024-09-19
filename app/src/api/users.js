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
