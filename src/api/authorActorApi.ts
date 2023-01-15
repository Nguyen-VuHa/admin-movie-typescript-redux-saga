const { default: axiosClient } = require("./axiosClient");

const authorActorApi = {
    getSelectAuthorActorApi: () => {
        const url = `api/author-actor/select-all`;
        return axiosClient.get(url);
    },
    getListAuthorActorApi: (payload: any): any => {
        const url = `api/author-actor/all?_p=${payload.page}&_p_size=10&_s=${payload.search}&_type=${payload.type}`;
        return axiosClient.get(url);
    },
    createdNewAuthorActorApi: (payload: any): any => {
        const url = `api/author-actor/create`;
        return axiosClient.post(url, payload);
    },
    deletedAuthorActorApi: (payload: any): any => {
        const url = `api/author-actor/delete?_id=${payload}`;
        return axiosClient.delete(url);
    },
    updatedAuthorActorApi: (payload: any): any => {
        const url = `api/author-actor/update`;
        return axiosClient.put(url, payload);
    }
}

export default authorActorApi;