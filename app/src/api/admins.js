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
