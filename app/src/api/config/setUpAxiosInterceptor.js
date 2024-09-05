// setUpAxiosInterceptor.js
import axios from 'axios';

export const setUpAxiosInterceptor = () => {
  // Anfrage-Interceptor
  axios.interceptors.request.use(config => {
    // Authentifizierungstoken, falls vorhanden, zu jeder Anfrage hinzufügen
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token vorhanden, Header gesetzt.');
    } else {
      console.log('Kein Token vorhanden.');
    }
    return config;
  }, error => {
    console.log('Fehler bei der Anfrage:', error);
    return Promise.reject(error);
  });

  // Antwort-Interceptor
  axios.interceptors.response.use(response => {
    // Verarbeite die Antwort
    console.log('Antwort erhalten:', response);
    return response;
  }, error => {
    // Beispiel: Fehlerbehandlung
    if (error.response && error.response.status === 401) {
      // Token abgelaufen oder Benutzer nicht autorisiert
      console.log('Token abgelaufen oder Benutzer nicht autorisiert. Sie müssen sich erneut anmelden.');
    } else {
      console.log('Fehler bei der Antwort:', error);
    }
    return Promise.reject(error);
  });
};
