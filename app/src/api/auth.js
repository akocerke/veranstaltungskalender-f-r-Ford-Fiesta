// src/api/auth.js
import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Fehler beim Login:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await api.post('/auth/logout', {}, { withCredentials: true });
    // Keine Notwendigkeit, Cookies auf der Client-Seite zu entfernen, da der Server das erledigen sollte
    return response.data;
  } catch (error) {
    console.error('Fehler beim Logout:', error);
    throw error;
  }
};


export const signup = async (username, email, password) => {
  try {
    const response = await api.post('/auth/signup', { username, email, password });
    return response.data;//enthält den token
  } catch (error) {
    console.error('Fehler bei der Registrierung:', error);
    throw error;
  }
};
