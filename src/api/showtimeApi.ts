import { configHeaderAxios } from "utils/configAxios";

const { default: axiosClient } = require("./axiosClient");

const showtimeApi = {
    fetchShowtimes: (payload: any) => {
        const url = `api/showtime`;

        const config = configHeaderAxios({
            params: {
                _p: payload.page,
                _p_size: 10,
                _code: payload.code,
                _mv_id: payload.movieId,
                _cine_id: payload.roomId,
            }
        });

        return axiosClient.get(url, config);
    },
}

export default showtimeApi;