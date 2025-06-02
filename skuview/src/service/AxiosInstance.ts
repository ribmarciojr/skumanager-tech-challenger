import axios from 'axios';

export function AxiosService(){
    
    const GatewayURL = "http://localhost:3000/api/v1";
    
    const axiosInstance = axios.create({
        baseURL: GatewayURL,
        timeout: 10000,
        headers: {
            'Content-Type' : 'application/json',
        }
    });

    return axiosInstance;
}
