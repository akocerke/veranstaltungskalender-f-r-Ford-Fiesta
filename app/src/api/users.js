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

    return response.data; // Stelle sicher, dass die Daten zurückgegeben werden
  } catch (error) {
    console.error('Error submitting rating:', error.response?.data.message || error.message);
    throw error; // Fehler weitergeben
  }
};


// POST /users/events/comment - angemeldete Benutzer kann ein Kommentar abgeben
export const changeComment = async (eventId, comment) => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('User is not authenticated');
    return;
  }

  try {
    const response = await api.post('/users/events/comment', 
      { eventId, comment }, 
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Überprüfen, ob die Antwort den Status 201 hat (Erstellung erfolgreich)
    if (response.status === 201) {
      return response.data; // Rückgabe der Daten bei Erfolg
    } else {
      throw new Error('Fehler beim Hinzufügen des Kommentars');
    }
  } catch (error) {
    console.error('Error adding comment:', error.response?.data.message || error.message);
    throw error; // Fehler weitergeben
  }
};

// Funktion zur Überprüfung ob der Benutzer angemeldet ist
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      // Versuche das Token zu entschlüsseln und überprüfe, ob es gültig ist
      const decodedToken = JSON.parse(atob(token.split('.')[1]));

      // Optional: Du könntest hier noch die Gültigkeit des Tokens prüfen (z.B. ob es abgelaufen ist)
      return !!decodedToken; // Benutzer ist authentifiziert, wenn es ein Token gibt
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }

  return false; // Kein Token, also nicht authentifiziert
};

// POST /users/events/create - Erstellen eines neuen Events durch den Benutzer
export const createEvent = async (eventDetails, imageFile) => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('User is not authenticated');
    return null; // Wenn der Benutzer nicht authentifiziert ist, gebe null zurück
  }

  try {
    // Event erstellen und Upload-URL erhalten
    const response = await api.post('users/events/create', {
      title: eventDetails.title,
      description: eventDetails.description,
      date: eventDetails.date,
      imageFileName: imageFile.name,
      imageFileType: imageFile.type,
    }, {
      headers: {
        Authorization: `Bearer ${token}` // Token im Header mitschicken
      }
    });

    const data = response.data; // Zugriff auf die Antwortdaten

    if (data.success) {
      // Erfolgreiche Antwort vom Backend
      const uploadResponse = await api.put(data.uploadUrl, imageFile, {
        headers: {
          'Content-Type': imageFile.type,
        },
      });

      // Überprüfen, ob der Bild-Upload erfolgreich war
      if (uploadResponse.status === 200) {
        return {
          success: true,
          message: data.message || 'Event and image uploaded successfully!', // Verwende die Nachricht vom Backend
          eventId: data.eventId,
          uploadUrl: data.uploadUrl,
        };
      } else {
        return {
          success: false,
          message: 'Image upload failed, but event was created.',
        };
      }
    } else {
      // Falls success == false
      return {
        success: false,
        message: data.message, // Hier wird die API-Message verwendet
      };
    }
  } catch (error) {
    console.error('Error creating event:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Error: Unable to create event or upload image.', // Hier wird die API-Fehlermeldung verwendet
    };
  }
};

// PUT /users/events/update - Aktualisieren eines Events durch angemeldeten Benutzer
export const updateEvent = async (eventDetails, imageFile) => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('User is not authenticated');
    return null; // Wenn der Benutzer nicht authentifiziert ist, gebe null zurück
  }

  try {
    // Event aktualisieren und Upload-URL erhalten
    const response = await api.put('users/events/update', {
      id: eventDetails.id, // ID des Events hinzufügen
      title: eventDetails.title,
      description: eventDetails.description,
      date: eventDetails.date,
      imageFileName: imageFile ? imageFile.name : null, // Bilddateiname
      imageFileType: imageFile ? imageFile.type : null, // Bilddateityp
    }, {
      headers: {
        Authorization: `Bearer ${token}` // Token im Header mitschicken
      }
    });

    const data = response.data; // Zugriff auf die Antwortdaten

    if (data.success) {
      // Erfolgreiche Antwort vom Backend
      if (imageFile) {
        const uploadResponse = await api.put(data.uploadUrl, imageFile, {
          headers: {
            'Content-Type': imageFile.type,
          },
        });

        // Überprüfen, ob der Bild-Upload erfolgreich war
        if (uploadResponse.status === 200) {
          return {
            success: true,
            message: 'Event and image uploaded successfully!',
            eventId: data.eventId,
            uploadUrl: data.uploadUrl,
          };
        } else {
          return {
            success: false,
            message: 'Image upload failed, but event was created.',
          };
        }
      } else {
        return {
          success: true,
          message: 'Event updated successfully without image upload.',
          eventId: data.eventId,
        };
      }
    } else {
      // Falls success == false
      return {
        success: false,
        message: data.message, // Hier wird die API-Message verwendet
      };
    }
  } catch (error) {
    console.error('Error updating event:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Error: Unable to update event or upload image.',
    };
  }
};
