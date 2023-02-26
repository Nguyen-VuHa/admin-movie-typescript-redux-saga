import { configHeaderAxios } from "utils/configAxios";

const { default: axiosClient } = require("./axiosClient");

const cinemaApi = {
    fetchAllSite: () => {
        const url = `api/sites`;

        return axiosClient.get(url);
    },
    fetchCinemaBySite: (payload: any) => {
        const url = `api/site/cinema`;

        const config = configHeaderAxios({
            params: {
                _id: payload.id,
                _p: payload.currentPage
            }
        })

        return axiosClient.get(url, config);
    },
    fetchDetailCinemaById: (payload: any) => {
        const url = `api/cinema/${payload}`;

        return axiosClient.get(url);
    },
    fetchLocalAddress: () => {
        const url = `api/local/address`;

        return axiosClient.get(url);
    },
    createCinema: (payload: any) => {
        const url = `api/create/cinema`;

        return axiosClient.post(url, payload);
    },
    updateCinema: (payload: any) => {
        const url = `api/update/cinema`;

        const config = configHeaderAxios({
            params: {
                _id: payload.id,
            }
        })

        return axiosClient.put(url, payload, config);
    },
}

export default cinemaApi;