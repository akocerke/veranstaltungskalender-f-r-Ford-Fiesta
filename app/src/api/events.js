// src/api/events.js
import api from './api'

export const getAllEvents = async () => {
  try {
    const response = await api.get('/events/all')
    return response.data
  } catch (error) {
    console.error('Fehler beim Abrufen der Events:', error)
    throw error
  }
}

// Funktion zum Abrufen der Bild-URL
export const fetchImageUrl = async (fileName) => {
  try {
    // Sende den fileName im Body der POST-Anfrage
    const response = await api.post('/events/get-url', { fileName })
    return response.data.url // Gibt die URL zurück
  } catch (error) {
    console.error(
      'Error fetching image URL:',
      error.response?.data.message || error.message
    )
    throw new Error('Error fetching image URL') // Wirf einen Fehler, wenn etwas schiefgeht
  }
}
