import { configHeaderAxios } from "utils/configAxios";

const { default: axiosClient } = require("./axiosClient");

const moviesApi = {
    fetchAllMovie: (payload: any) => {
        const url = `api/movie/data-admin`;

        const config = configHeaderAxios({
            params: {
                _p: payload.page,
                _p_size: 10,
                _s: payload.search,
                _sort_type: payload.sortBy,
            }
        });

        return axiosClient.get(url, config);
    },
    updateStatusMovie: (payload: any) => {
        const url = `api/movie/hidden`;

        const config = configHeaderAxios({
            params: {
                _id: payload,
            }
        });

        return axiosClient.put(url, {}, config);
    },
    createNewMovie: (payload: any) => {
        const url = `api/movie/create`;
        return axiosClient.post(url, payload);
    },
    uploadPosterMovie: (payload: any) => {
        const url = `api/movie/upload-images`;

        const config = configHeaderAxios({
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        
        return axiosClient.post(url, payload, config);
    },
}

export default moviesApi;