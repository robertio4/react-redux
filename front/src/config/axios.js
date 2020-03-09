import axios from 'axios';

const clientAxios = axios.create({
  baseURL: 'http://localhost:9090/'
});

export default clientAxios;
