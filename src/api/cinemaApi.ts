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
}

export default cinemaApi;