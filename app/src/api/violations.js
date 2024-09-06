// src/api/violations.js
import api from './api';

export const getViolations = async () => {
  try {
    const response = await api.get('/violations');
    return response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Violations:', error);
    throw error;
  }
};