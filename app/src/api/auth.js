// src/api/auth.js
import api from './api'

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password })
    const { token } = response.data

    // Token im localStorage speichern
    if (token) {
      localStorage.setItem('token', token)
    }

    return response.data
  } catch (error) {
    console.error('Fehler beim Login:', error)
    throw error
  }
}

export const logout = async () => {
  try {
    // Lese den Token aus dem LocalStorage
    const token = localStorage.getItem('token')

    if (!token) {
      throw new Error('Kein Token gefunden, bitte anmelden.')
    }

    // Sende den Logout-Request mit dem Token im Authorization-Header
    const response = await api.post(
      '/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Setze den Token im Header
        },
      }
    )

    console.log('Logout Response:', response.data) // Ausgabe der Serverantwort im Konsolenlog
    return response.data
  } catch (error) {
    console.error(
      'Logout Error:',
      error.response ? error.response.data : 'Fehler beim Logout'
    )
    throw error.response ? error.response.data : 'Fehler beim Logout'
  }
}
export const signup = async (username, email, password) => {
  try {
    const response = await api.post('/auth/signup', {
      username,
      email,
      password,
    })
    return response.data //enthält den token
  } catch (error) {
    console.error('Fehler bei der Registrierung:', error)
    throw error
  }
}
