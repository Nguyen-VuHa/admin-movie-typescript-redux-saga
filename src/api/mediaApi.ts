import { configHeaderAxios } from "utils/configAxios";

const { default: axiosClient } = require("./axiosClient.dev");

export const apiGetSignUploadVide = () => {
    const url = `/api/media/generate-sign`;

    return axiosClient.get(url);
}

export const apiUploadVideoFile = (payload: any) => {
    const url = `/api/media/video/upload`;

    return axiosClient.post(url, payload);
}


export const apiGetVideoList = (payload: any) => {
    const config = configHeaderAxios({
        params: {
            _page: payload.page,
            _page_size: payload.pageSize,
            _search: payload.search,
        }
    });
    

    const url = `/api/media/list`;

    return axiosClient.get(url, config);
}
