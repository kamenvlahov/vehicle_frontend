import axios from 'axios';
import * as https from 'stream-http';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:8000',
    httpsAgent: new https.Agent({
        rejectUnauthorized: true
    }),
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
    },
    timeout: 10000,
});

export default axiosInstance;
