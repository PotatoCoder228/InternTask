import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8400/'
});

export default axiosInstance;