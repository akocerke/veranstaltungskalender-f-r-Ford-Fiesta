// src/api/users.js
import api from './api';

export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Benutzer:', error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Fehler beim Abrufen des Benutzers mit ID ${id}:`, error);
    throw error;
  }
};
