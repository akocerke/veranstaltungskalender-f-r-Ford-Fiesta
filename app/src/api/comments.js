// src/api/comments.js
import api from './api'

export const getComments = async () => {
  try {
    const response = await api.get('/comments')
    return response.data
  } catch (error) {
    console.error('Fehler beim Abrufen der Comments:', error)
    throw error
  }
}
