// src/api/api.js
import axios from 'axios'

const api = axios.create({
  baseURL:
    'https://apo5qnldilotphiggvx7pnoeki0bwwyr.lambda-url.eu-central-1.on.aws/api-ford-fiesta/', // Basis-URL für alle Anfragen
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
