// src/api/events.js
import api from './api';

export const getEvents = async () => {
  try {
    const response = await api.get('/events');
    return response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Events:', error);
    throw error;
  }
};