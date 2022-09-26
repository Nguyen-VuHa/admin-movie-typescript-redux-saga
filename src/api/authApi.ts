const { default: axiosClient } = require("./axiosClient");

const authApi = {
    generatorKeyAuth: (eml: string) => {
        const url = `api/auth/account/generator-key?eml=${eml}`;
        return axiosClient.get(url);
    },
    loginAccount: (data: object, eml: string) => {
        const url = `api/auth/account/admin/sign-in?eml=${eml}`;
        return axiosClient.post(url, JSON.stringify(data));
    },
    refreshTokenAdmin: () => {
        const url = `api/auth/change-token`;
        return axiosClient.post(url, { refreshToken: localStorage.getItem('refreshToken') });
    }
}

export default authApi;