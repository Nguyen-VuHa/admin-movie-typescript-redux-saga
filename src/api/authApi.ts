const { default: axiosClient } = require("./axiosClient");

const authApi = {
    loginAccount: (data: object) => {
        const url = `auth/admin-login`;
        return axiosClient.post(url, JSON.stringify(data));
    },
    refreshTokenAdmin: (refreshToken: string) => {
        const url = `auth/refresh-token-admin`;
        return axiosClient.post(url, {refreshToken: refreshToken});
    }
}

export default authApi;