import http from '../services/httpService';
/*comment */
export const getRecursos = async () => {
  const response = await http.get('/recursos');
  return response.data;
};
