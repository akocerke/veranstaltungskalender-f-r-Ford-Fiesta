import React, { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch (error) {
      console.error('Token could not be decoded:', error)
      return null
    }
  }

  const login = (token) => {
    localStorage.setItem('accessToken', token)
    const decodedToken = decodeToken(token)
    if (decodedToken) {
      setUser(decodedToken)
      setIsAuthenticated(true)
    }
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('token')
    setUser(null)
    setIsAuthenticated(false)
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      const decodedToken = decodeToken(token)
      if (decodedToken) {
        setUser(decodedToken)
        setIsAuthenticated(true)
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
