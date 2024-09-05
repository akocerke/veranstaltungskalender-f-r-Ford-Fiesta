// src/api/admins.js
import api from './api';

export const getAdmins = async () => {
  try {
    const response = await api.get('/admins');
    return response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Admins:', error);
    throw error;
  }
};
