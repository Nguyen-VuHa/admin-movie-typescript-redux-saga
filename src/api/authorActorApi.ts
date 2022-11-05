const { default: axiosClient } = require("./axiosClient");

const authorActorApi = {
    getListAuthorActorApi: (payload: any): any => {
        const url = `api/author-actor/all?_p=${payload.page}&_p_size=10&_s=${payload.search}&_type=${payload.type}`;
        return axiosClient.get(url);
    }
}

export default authorActorApi;