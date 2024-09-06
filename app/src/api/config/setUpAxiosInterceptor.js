// setUpAxiosInterceptor.js
import axios from 'axios';

// Funktion zur Einrichtung der Interceptors
export const setUpAxiosInterceptor = () => {
  // Anfrage-Interceptor
  axios.interceptors.request.use(
    (config) => {
      // Token aus dem LocalStorage abrufen
      const token = localStorage.getItem('token');
      
      // Wenn ein Token vorhanden ist, füge es zu den Headern der Anfrage hinzu
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      // Fehlerbehandlung für die Anfrage
      return Promise.reject(error);
    }
  );

  // Antwort-Interceptor
  axios.interceptors.response.use(
    (response) => {
      // Erfolgreiche Antwort
      return response;
    },
    (error) => {
      // Fehlerbehandlung für die Antwort
      // Hier kannst du zum Beispiel den Benutzer abmelden, wenn der Token abgelaufen ist
      if (error.response && error.response.status === 401) {
        // Token möglicherweise abgelaufen, führe eine Abmeldung oder eine Token-Aktualisierung durch
        // localStorage.removeItem('token');
        // Optionale Umleitung zur Anmeldeseite
      }
      
      return Promise.reject(error);
    }
  );
};
