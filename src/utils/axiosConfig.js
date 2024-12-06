import axios from 'axios';
import { baseURL } from './config';

const appAxios = axios.create({
    baseURL: baseURL,

});

export default appAxios;