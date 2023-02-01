import { configHeaderAxios } from "utils/configAxios";

const { default: axiosClient } = require("./axiosClient");

const authApi = {
    generatorKeyAuth: (eml: string) => {
        const url = `api/auth/account/generator-key`;

        const config = configHeaderAxios({
            params: {
                eml: eml,
            }
        });

        return axiosClient.get(url, config);
    },
    loginAccount: (data: object, eml: string) => {
        const url = `api/auth/account/admin/sign-in`;

        const config = configHeaderAxios({
            params: {
                eml: eml,
            }
        });

        return axiosClient.post(url, JSON.stringify(data), config);
    },
    refreshTokenAdmin: () => {
        const url = `api/auth/change-token`;
        
        return axiosClient.post(url, { 
            refreshToken: localStorage.getItem('refreshToken'), 
            dssKey: localStorage.getItem('dssKey') 
        });
    }
}

export default authApi;