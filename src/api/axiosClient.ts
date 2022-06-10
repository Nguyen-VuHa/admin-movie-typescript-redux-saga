import axios from "axios";

const axiosClient = axios.create({
    baseURL: '',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosClient;