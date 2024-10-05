import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const AdminProtectedRoute = ({ children }) => {
  // Token aus dem Local Storage abrufen
  const token = localStorage.getItem('accessToken')

  // Überprüfen, ob der Token vorhanden ist und dekodiert werden kann
  if (!token) {
    return <Navigate to="/" replace />
  }

  // Token dekodieren (das könntest du auch in eine separate Funktion auslagern)
  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1])) // Dekodieren des JWT
    } catch (error) {
      return null
    }
  }

  const decodedToken = decodeToken(token)

  // Überprüfen, ob der Benutzer ein Admin ist
  if (!decodedToken || decodedToken.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <>{children}</> // Gibt die Kinder (Routes) zurück
}

// Validierung der Props für AdminProtectedRoute
AdminProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AdminProtectedRoute
