import axios from 'axios';

const TRMSClient = axios.create({
    baseURL: process.env.REACT_APP_ENVIRONMENT === 'local' ? 'http://localhost:5000' : process.env.TRMS_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  
export default TRMSClient;