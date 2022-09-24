const { default: axiosClient } = require("./axiosClient");

const categoriesApi = {
    fetchAllCategoryApi: (payload: any) => {
        const url = `api/category/all?_p=${payload}`;
        return axiosClient.get(url);
    },
    createCategoryApi: (payload: any) => {
        const url = `api/category/create`;
        return axiosClient.post(url, payload);
    },
    updateCategoryApi: (payload: any) => {
        const url = `api/category/update`;
        return axiosClient.put(url, payload);
    },
}

export default categoriesApi;