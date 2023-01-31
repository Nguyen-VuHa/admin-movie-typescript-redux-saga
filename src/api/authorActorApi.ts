import { configHeaderAxios } from "utils/configAxios";

const { default: axiosClient } = require("./axiosClient");

const authorActorApi = {
    getSelectAuthorActorApi: () => {
        const url = `api/author-actor/select-all`;
        return axiosClient.get(url);
    },
    getListAuthorActorApi: (payload: any): any => {
        const url = `api/author-actor/all`;

        const config = configHeaderAxios({
            params: {
                _p: payload.page,
                _p_size: 10,
                _s: payload.search,
                _type: payload.type,
            }
        });

        return axiosClient.get(url, config);
    },
    createdNewAuthorActorApi: (payload: any): any => {
        const url = `api/author-actor/create`;
        return axiosClient.post(url, payload);
    },
    deletedAuthorActorApi: (payload: any): any => {
        const url = `api/author-actor/delete`;

        const config = configHeaderAxios({
            params: {
                _id: payload,
            }
        });
        
        return axiosClient.delete(url, config);
    },
    updatedAuthorActorApi: (payload: any): any => {
        const url = `api/author-actor/update`;
        return axiosClient.put(url, payload);
    }
}

export default authorActorApi;