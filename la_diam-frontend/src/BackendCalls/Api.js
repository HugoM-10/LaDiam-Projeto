import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 400:
          console.warn('Requisição inválida (400)');
          break;
        case 401:
          console.warn('Não autenticado (401)');
          break;
        case 403:
          console.warn('Sem permissões (403)');
          break;
        case 404:
          console.warn('Não encontrado (404)');
          break;
        case 500:
          console.error('Erro interno do servidor (500)');
          break;
        default:
          console.error(`Erro desconhecido (${status})`);
      }
    } else if (error.request) {
      console.error('Sem resposta do servidor');
    } else {
      console.error('Erro na requisição:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
