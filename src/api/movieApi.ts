const { default: axiosClient } = require("./axiosClient");

const moviesApi = {
    fetchAllMovie: (payload: any) => {
        const url = `api/movie/data-admin?_p=${payload.page}&_p_size=10&_s=${payload.search}&_sort_type=${payload.sortBy}`;
        return axiosClient.get(url);
    },
    updateStatusMovie: (payload: any) => {
        const url = `api/movie/hidden?_id=${payload}`;
        return axiosClient.put(url);
    },
    createNewMovie: (payload: any) => {
        const url = `api/movie/create`;
        return axiosClient.post(url, payload);
    },
}

export default moviesApi;