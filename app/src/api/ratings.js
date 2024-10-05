// src/api/ratings.js
import api from './api'

export const getRatings = async () => {
  try {
    const response = await api.get('/ratings')
    return response.data
  } catch (error) {
    console.error('Fehler beim Abrufen der Ratings:', error)
    throw error
  }
}
