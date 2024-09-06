const { default: axiosClient } = require("./axiosClient.dev");

export const apiGetSignUploadVide = () => {
    const url = `/api/media/generate-sign`;

    return axiosClient.get(url);
}

export const apiUploadVideoFile = (payload: any) => {
    const url = `/api/media/video/upload`;

    return axiosClient.post(url, payload);
}