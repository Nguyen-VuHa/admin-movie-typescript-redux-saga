const { default: axiosClient } = require("./axiosClient");

const authApi = {
    loginAccount: (data: object) => {
        const url = `auth/admin-login`;
        return axiosClient.post(url, JSON.stringify(data));
    },
}

export default authApi;